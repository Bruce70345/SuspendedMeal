'use client'
import React from 'react';
import { Typography, Box, Container, Grid, Card, CardContent, AppBar, Toolbar, IconButton } from '@mui/material';
import { ThemeProvider } from 'styled-components';
import Theme from '../lib/Theme';

export default function about() {
  return (
    <ThemeProvider theme={Theme}>
      <Box sx={{ margin:"auto", my: 4, width:"75%" }}>
        <Typography variant="h3" component="h1" gutterBottom>
          關於我們
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  起源
                </Typography>
                <Typography variant="body1" paragraph>
                  我們的故事始於一則令人心酸的新聞：一位窮人因為沒錢吃飯而去偷水果。這則新聞觸動了我們的心，讓我們意識到有許多人在為下一餐的著落而煩惱。然而，我們也發現，現今有許多善心店家願意提供愛心餐點。於是，我們決定建立一個平台，將這些資源整合起來，讓有需要的人可以方便地獲取到這些愛心餐。
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  我們的目標
                </Typography>
                <Typography variant="body1" paragraph>
                  我們的目標是通過愛心待用餐平台，將有需要的個人與願意提供幫助的店家連接起來。我們希望通過這個平台，不僅能夠解決飢餓問題，還能夠促進社區的愛心互助。
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ width: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  網頁功能
                </Typography>
                <Typography variant="body1" paragraph>
                  我們的平台提供以下功能：
                </Typography>
                <Typography variant="body1" paragraph>
                  1. 查看店家供應情形：用戶可以瀏覽和搜索附近提供愛心餐的店家，了解每家店目前的供應情況。
                </Typography>
                <Typography variant="body1" paragraph>
                  2. 商家信息編輯：註冊商家可以在資訊頁面上編輯和更新餐點信息，確保用戶獲得最新的供應情況。
                </Typography>
                <Typography variant="body1" paragraph>
                  3. 資源整合：我們的平台會不斷收集和整合更多的愛心資源，確保有需要的人能夠獲得幫助。
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>


  );
}
