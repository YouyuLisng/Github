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
- 在終端機移動到
