# Dcard 2024 Web Frontend Intern Homework

## 作業要求
1. 串接 GitHub API，讓作者在登入後能夠「瀏覽」、「新增」、「更新」Blog 文章，「瀏覽」留言；非作者僅能「瀏覽」Blog 文章，及「瀏覽」留言。
2. 使用 React.js 或基於此的框架，例如 Next.js
3. 請使用 Git 版本控制，並將程式碼上傳至 GitHub 上，作業完成後繳交連結即可
4. 請在 README 內詳細說明如何啟動專案與作業架構的設計

## 功能
- GitHub Login
1. 串接GitHub Login，讓使用者有權限操作 GitHub API

- Post Management
1. GitHub Issue 作為 Post,以 GitHub Issue 實作, 並將 close Issue 視為刪除 Post

- User Interface
1. 第一次只能載入 10 筆
2. 每當列表滾到底部時要需要自動發送 API 請求,並載入額外 10 筆,直到沒有更多文章
3. 顯示文章內容,並正確 render 出 markdown 的內容
4. 使用者可以在此「編輯」、「刪除」
5. 新增 / 編輯文章時,可以使用 Modal 或跳轉至新的頁面操作，至少需要使用 title 和 body 兩個欄位，表單驗證:title 為必填,body 至少需要 30 字

## 專案技術使用
- NextJS 14 (App Route)
- React
- TypeScript
- Tailwind CSS

## 如何啟動專案
- 請通過git clone 複製下方網址複製儲存庫
```
https://github.com/YouyuLisng/dcard-demo.git
```
- 在終端機移動到儲存庫的資料夾或者將下載的檔案拉取到終端機
```
cd dcard-demo
```
- 請依序順序執行下方指令
```
npm i
```
```
npm run dev
```

## 專案說明 

### 路由說明:
[首頁](http://localhost:3000/):路徑為 /

[使用者頁面](http://localhost:3000/user/YouyuLisng/repos): 路徑結構為 /user/[userName]/repos

[使用者倉儲頁面](http://localhost:3000/user/YouyuLisng/repoName/Dcard/issues): 路徑結構為 /user/[userName]/repos/[repoName]/issues

[倉儲中的Issues內容](http://localhost:3000/user/YouyuLisng/repoName/Dcard/issues/20): 路徑結構為 /user/[userName]/repos/[repoName]/issues/[issueNumber]

### 架構設計與解說:
#### 首頁
每個頁面都有一個共用的 Navbar，這個 Navbar 包含了一個頭像圖標，放置在右上角。當使用者點擊這個頭像圖標時，會觸發登入操作。
點擊頭像圖標後，用戶將被導向 GitHub 登入頁面 ---> 獲取accessToken ---> accessToken用來識別用戶身份，它將被用於之後需驗證的API請求

首頁會有Search Input 可以輸入使用者名稱 ---> 點擊搜索 ---> 前往搜尋頁面

### 
