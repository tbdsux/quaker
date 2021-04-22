import { q } from '@lib/faunadb';

const { Ref, Collection } = q;

// creates a reference
const GET_REF = (collection_name: string, id: string) => Ref(Collection(collection_name), id);

export { GET_REF };
