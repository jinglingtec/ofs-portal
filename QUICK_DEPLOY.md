# 🚀 快速部署指南（3 分钟）

## 方法一：使用自动化脚本（最简单）

```bash
./deploy.sh
```

按照提示操作即可！脚本会自动：
- 检查登录状态
- 部署后端到 Railway
- 部署前端到 Vercel  
- 配置 CORS

---

## 方法二：手动部署

### 步骤 1：部署后端（Railway）

```bash
cd backend

# 首次部署
railway login
railway init
railway add --plugin postgresql
railway variables set PORT=3001
railway up

# 获取后端 URL
railway domain
# 复制输出的 URL，如: https://xxx.railway.app
```

### 步骤 2：部署前端（Vercel）

```bash
cd ../frontend

# 首次部署
vercel login
vercel --prod

# 按照提示操作
# Set up and deploy? Yes
# Which scope? (选择你的账号)
# Link to existing project? No
# What's your project's name? (输入项目名或直接回车)
# In which directory is your code located? ./ (直接回车)
```

### 步骤 3：配置环境变量

#### 在 Vercel 中添加环境变量：

1. 访问 https://vercel.com/dashboard
2. 选择你的项目
3. Settings → Environment Variables
4. 添加：
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: `https://你的railway后端.railway.app`
5. Redeploy

#### 在 Railway 中更新 CORS：

```bash
cd backend
railway variables set CORS_ORIGIN="https://你的vercel前端.vercel.app"
```

---

## 完成！

你现在拥有：
- ✅ 后端 API: `https://xxx.railway.app`
- ✅ 前端网站: `https://xxx.vercel.app`

**分享前端 URL 给任何人即可访问！**

---

## 🔄 后续更新

每次代码更新后：

```bash
# 更新后端
cd backend
railway up

# 更新前端
cd frontend
vercel --prod
```

或者推送到 GitHub 后，Railway 和 Vercel 会自动部署（如果配置了 GitHub 集成）。

---

## 💡 提示

- Railway 免费额度：$5/月
- Vercel 免费额度：100GB 带宽/月
- 两者都提供自动 HTTPS 和 CDN

详细说明请查看 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
