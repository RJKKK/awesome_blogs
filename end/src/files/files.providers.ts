import { Connection } from 'mongoose';
import { MongoGridFS } from 'mongo-gridfs'
// import { ProductSchema } from './schemas/product.schema';

export const filesProviders = [
  {
    provide: 'FILE_MODEL',
    useFactory: (mongogrifs: MongoGridFS) => mongogrifs,
    inject: ['DATABASE_CONNECTION'],
  },
];