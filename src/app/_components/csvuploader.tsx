"use client";

import * as React from 'react';
import { handleTransactionInput } from '~/lib/utils';


export function CSVUploader() {
  
  return (
    <section>
      <input type="file" accept=".csv" onChange={handleTransactionInput}></input>
    </section>
  );
}