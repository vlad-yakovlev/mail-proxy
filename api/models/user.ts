import bcrypt from 'bcrypt';
import { Collection, FilterQuery, ObjectId } from 'mongodb';
import mongoClient from '../clients/mongo';

interface UserDocument {
    _id: ObjectId;
    login: string;
    passwordHash: string;
}

export default class User {
    private get collection(): Collection<UserDocument> {
        return mongoClient.db().collection('users');
    }

    public static async create(login: string, password: string): Promise<User> {
        const user: User = new User();

        user.login = login;
        user.password = password;

        await user.save();

        return user;
    }

    public static async find(login: string): Promise<User> {
        const user: User = new User();

        await user.fetch({ login });

        return user;
    }

    public static async auth(login: string, password: string): Promise<User> {
        const user: User = await this.find(login);

        if (!(await bcrypt.compare(password, user.passwordHash!))) {
            throw new Error('Password does not match');
        }

        return user;
    }

    public id?: ObjectId;
    public login?: string;
    public password?: string;
    public passwordHash?: string;

    public async fetch(filter: FilterQuery<UserDocument>): Promise<void> {
        const userDocument: UserDocument | null = await this.collection.findOne(filter);

        if (!userDocument) {
            throw new Error('User not found');
        }

        this.id = userDocument._id;
        this.login = userDocument.login;
        this.password = undefined;
        this.passwordHash = userDocument.passwordHash;
    }

    public async save(): Promise<void> {
        if (this.password != null) {
            this.passwordHash = await bcrypt.hash(this.password, 10);
        }

        const userDocument: UserDocument = {
            _id: this.id || new ObjectId(),
            login: this.login!,
            passwordHash: this.passwordHash!,
        };

        if (this.id) {
            await this.collection.update({ _id: this.id }, userDocument);
        } else {
            await this.collection.insert(userDocument);

            this.id = userDocument._id;
        }
    }
}
