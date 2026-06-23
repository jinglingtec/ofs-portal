# 📝 部署命令清单

按顺序执行以下命令即可完成部署。每个命令都可以直接复制粘贴到终端运行。

---

## ✅ 准备工作（已完成）

- [x] Git 仓库已初始化
- [x] Vercel CLI 已安装
- [x] Railway CLI 已安装
- [x] 配置文件已创建

---

## 🚂 步骤 1：部署后端到 Railway

### 1.1 登录 Railway

在你的终端运行（会打开浏览器）：

```bash
! railway login
```

### 1.2 初始化并部署后端

```bash
! cd /Users/hubing/workspace/ofs/backend && railway init
```

选择 "Create a new project"，输入项目名称（如 `ofs-backend`）

### 1.3 添加 PostgreSQL 数据库

```bash
! railway add
```

选择 "PostgreSQL"

### 1.4 设置环境变量

```bash
! railway variables set PORT=3001
```

### 1.5 部署后端

```bash
! railway up
```

### 1.6 生成公开域名

```bash
! railway domain
```

**📋 复制输出的域名（如 `https://xxx.railway.app`），后面会用到！**

---

## 🎨 步骤 2：部署前端到 Vercel

### 2.1 登录 Vercel

```bash
! vercel login
```

### 2.2 部署前端

```bash
! cd /Users/hubing/workspace/ofs/frontend && vercel
```

按照提示操作：
- Set up and deploy? **Yes**
- Which scope? **选择你的账号**
- Link to existing project? **No**
- What's your project's name? **ofs-portal**（或直接回车）
- In which directory is your code located? **./**（直接回车）
- Want to override the settings? **No**（直接回车）

**📋 复制输出的前端 URL（如 `https://ofs-portal-xxx.vercel.app`）**

---

## ⚙️ 步骤 3：配置环境变量

### 3.1 在 Vercel 添加后端 API 地址

**方式一：使用 CLI**

```bash
! vercel env add NEXT_PUBLIC_API_URL
```

- Environment Variables: **NEXT_PUBLIC_API_URL**
- Value: **粘贴你的 Railway 后端地址**（步骤 1.6 的 URL）
- Add to which Environments? **Production, Preview, Development**（全选）

**方式二：使用 Web 界面**

1. 访问 https://vercel.com/dashboard
2. 选择你的项目
3. Settings → Environment Variables
4. 添加变量：
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: `https://你的railway域名.railway.app`
   - Environments: 全选

### 3.2 在 Railway 配置 CORS

```bash
! cd /Users/hubing/workspace/ofs/backend && railway variables set CORS_ORIGIN=https://你的vercel域名.vercel.app
```

**注意：** 把 `https://你的vercel域名.vercel.app` 替换为步骤 2.2 中获得的实际 URL

---

## 🔄 步骤 4：重新部署

### 4.1 重新部署前端（应用环境变量）

```bash
! cd /Users/hubing/workspace/ofs/frontend && vercel --prod
```

### 4.2 重新部署后端（应用 CORS 配置）

Railway 会自动重新部署，无需手动操作。

---

## ✅ 步骤 5：验证部署

### 5.1 测试后端

```bash
! curl https://你的railway域名.railway.app
```

应该返回 `Hello World!`

### 5.2 访问前端

在浏览器打开：`https://你的vercel域名.vercel.app`

---

## 🎉 完成！

你的应用已成功部署：

- 🖥️ **前端**: https://你的vercel域名.vercel.app
- 🔌 **后端**: https://你的railway域名.railway.app

**把前端地址分享给外部用户即可访问！**

---

## 📊 管理面板

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Railway Dashboard**: https://railway.app/dashboard

---

## 🔄 后续更新代码

### 更新后端

```bash
! cd /Users/hubing/workspace/ofs/backend && railway up
```

### 更新前端

```bash
! cd /Users/hubing/workspace/ofs/frontend && vercel --prod
```

---

## 🆘 遇到问题？

查看详细文档：[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

或检查日志：
- Railway: `railway logs`
- Vercel: 在 Dashboard 中查看
