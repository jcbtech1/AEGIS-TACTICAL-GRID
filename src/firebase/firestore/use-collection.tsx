
'use client';

import { useEffect, useState } from 'react';
import { 
  collection, 
  onSnapshot, 
  query, 
  QueryConstraint, 
  DocumentData 
} from 'firebase/firestore';
import { initializeFirebase } from '../index';

export function useCollection<T = DocumentData>(path: string, constraints: QueryConstraint[] = []) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { db } = initializeFirebase();
    const q = query(collection(db, path), ...constraints);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
      setData(items);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [path]);

  return { data, loading };
}
