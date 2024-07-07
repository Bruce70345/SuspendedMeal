"use client"
import * as React from 'react';
import { useRouter } from 'next/navigation'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MapIcon from '@mui/icons-material/Map';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import Theme from '@/app/lib/Theme';
import Copyright from '@/app/lib/Copyright';
import LogInOutButton from '@/app/lib/Maps/LogInOutButton';
import useLoggedInStore from '@/stores/logInOut-store';



export default function SignIn() {
  const router = useRouter();
  const { logIn } = useLoggedInStore();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');


    try {
      const response = await fetch('http://localhost:1000/api/sign/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email": email, "password": password }),
      });

      if (!response.ok) {
        throw new Error('驗證失敗');
      }
      const result = await response.json();

      if (result.success) {
        localStorage.setItem('user', JSON.stringify(result));
        logIn();  // 更新 Zustand 状态
        router.push('/info');
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('登入錯誤:', error);
    }
  };

  return (
    <ThemeProvider theme={Theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <Link href="/"><MapIcon /></Link>
          </Avatar>
          <Typography component="h1" variant="h5">
            店家登入
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="電子信箱"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="登入密碼"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1 }}
            >
              點此登入
            </Button>
            <Grid container>
              <Grid item>
                <Link href="signup" variant="body2">
                  {"想成為供餐的愛心店家？點此註冊"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}