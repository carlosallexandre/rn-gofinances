import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import uuid from "react-native-uuid";
import { formatDate } from "../utils/formatDate";

interface Transaction {
  id: string;
  name: string;
  amount: number;
  type: "income" | "outcome";
  category: string;
  date: Date;
}

interface NewTransaction {
  name: string;
  amount: number;
  type: "income" | "outcome";
  category: string;
}

interface TransactionResume {
  amount: number;
  lastTransaction: Date;
}

interface TransactionsContextData {
  isLoading: boolean;
  transactions: Transaction[];
  loadTransactions(): Promise<void>;
  addTransaction(newTransaction: NewTransaction): Promise<void>;
  incomes: TransactionResume | null;
  outcomes: TransactionResume | null;
}

const TransactionsContext = createContext({} as TransactionsContextData);

interface TransactionsProviderProps {
  children: ReactNode;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const TRANSACTION_KEY = useRef("@gofinances:transactions").current;

  const [isLoading, setIsLoading] = useState(true);

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const loadTransactions = useCallback(async () => {
    try {
      setIsLoading(true);

      const data = await AsyncStorage.getItem(TRANSACTION_KEY);
      const dataParsed: Transaction[] = data ? JSON.parse(data) : [];

      const dataFormatted: Transaction[] = dataParsed.map((transaction) => ({
        id: transaction.id,
        name: transaction.name,
        type: transaction.type,
        category: transaction.category,
        date: new Date(transaction.date),
        amount: Number(transaction.amount),
      }));

      setTransactions(dataFormatted);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addTransaction = useCallback(
    async (data: NewTransaction) => {
      const newTransaction = {
        name: data.name,
        amount: data.amount,
        type: data.type,
        category: data.category,
        date: new Date(),
        id: String(uuid.v4()),
      };

      try {
        await AsyncStorage.setItem(
          TRANSACTION_KEY,
          JSON.stringify([newTransaction, ...transactions])
        );
        setTransactions((prevState) => [newTransaction, ...prevState]);
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    [transactions]
  );

  const getResume = useCallback(
    (data: Transaction[], type: Transaction["type"]): TransactionResume => {
      const amount = data.reduce(
        (acc, transaction) =>
          transaction.type === type ? acc + Number(transaction.amount) : acc,
        0
      );

      const lastDateTransactions = transactions
        .filter((transaction) => transaction.type === type)
        .map((transaction) => transaction.date.getTime());

      const lastTransaction = new Date(Math.max(...lastDateTransactions));

      return { amount, lastTransaction };
    },
    []
  );

  const [incomes, setIcomes] = useState<TransactionResume | null>(null);
  const [outcomes, setOutcomes] = useState<TransactionResume | null>(null);

  useEffect(() => {
    setIcomes(getResume(transactions, "income"));
    setOutcomes(getResume(transactions, "outcome"));
  }, [transactions]);

  return (
    <TransactionsContext.Provider
      value={{
        isLoading,
        transactions,
        loadTransactions,
        addTransaction,
        incomes,
        outcomes,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const ctx = useContext(TransactionsContext);

  if (!ctx)
    throw new Error("`useTransactions` must be used into TransactionsProvider");

  return ctx;
}
