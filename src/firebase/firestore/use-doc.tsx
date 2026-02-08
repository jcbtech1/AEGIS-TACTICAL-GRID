
'use client';

import { useEffect, useState } from 'react';
import { doc, onSnapshot, DocumentData } from 'firebase/firestore';
import { initializeFirebase } from '../index';

export function useDoc<T = DocumentData>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { db } = initializeFirebase();
    const unsubscribe = onSnapshot(doc(db, path), (snapshot) => {
      setData(snapshot.exists() ? ({ id: snapshot.id, ...snapshot.data() } as T) : null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [path]);

  return { data, loading };
}
