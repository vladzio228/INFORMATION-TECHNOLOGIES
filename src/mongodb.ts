import dotenv from 'dotenv';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import mongoDB from 'mongodb';

export const collections: { games?: mongoDB.Collection<Game> } = {};
type Platforms = 'PC' | 'PS4' | 'PS5' | '`XBOX';

type Game = {
  name: string;
  image: string;
  dateRelease: Date;
  price: number;
  platforms: Platforms[];
};
export const connectToDatabase = async () => {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING as string);

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const gamesCollection: mongoDB.Collection<Game> = db.collection(process.env.GAMES_COLLECTION_NAME as string);

  collections.games = gamesCollection;

  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${gamesCollection.collectionName}`);
};

export const createNewGame = async (newGame: Game) => {
  return await collections?.games?.insertOne(newGame);
};
