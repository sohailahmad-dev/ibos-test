'use client'
import { Button } from "@mui/material";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { Toaster } from 'react-hot-toast';

export default function Home() {
  const router = useRouter();
  const navigate = (path) => {
    router.push(path)
  }
  return (
    <div className={styles.main} >
      <Button
        variant="contained"
        onClick={() => navigate('/signup')}
      >
        Signup
      </Button>
      <Button
        variant="contained"
        onClick={() => navigate('/login')}
      >
        Login
      </Button>
      <Toaster />
    </div>
  );
}
