# OFS Portal 部署指南

本指南将帮助你将 OFS Portal 部署到公网，让外部用户可以访问。

## 📋 部署架构

- **前端**: Vercel (Next.js) - 免费，自动 HTTPS
- **后端**: Railway (NestJS) - 免费额度 $5/月
- **数据库**: Railway PostgreSQL - 自动配置

---

## 🚀 快速部署

### 方案一：使用 GitHub + 自动部署（推荐）

#### 1. 推送代码到 GitHub

```bash
# 在 GitHub 创建新仓库，然后执行：
git remote add origin https://github.com/你的用户名/ofs-portal.git
git branch -M main
git push -u origin main
```

#### 2. 部署后端到 Railway

1. 访问 [railway.app](https://railway.app)
2. 点击 "Start a New Project"
3. 选择 "Deploy from GitHub repo"
4. 选择你的 `ofs-portal` 仓库
5. Railway 会自动检测到 NestJS 项目并部署
6. 添加 PostgreSQL 数据库：
   - 点击 "+ New" → "Database" → "Add PostgreSQL"
   - Railway 会自动设置 `DATABASE_URL` 环境变量
7. 配置环境变量（在 Railway 项目设置中）：
   ```
   PORT=3001
   CORS_ORIGIN=https://你的-vercel-域名.vercel.app
   ```
8. 部署完成后，复制 Railway 提供的后端 URL（类似 `https://xxx.railway.app`）

#### 3. 部署前端到 Vercel

1. 访问 [vercel.com](https://vercel.com)
2. 点击 "Add New..." → "Project"
3. 选择你的 GitHub 仓库
4. 配置项目：
   - Framework Preset: Next.js
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. 添加环境变量：
   ```
   NEXT_PUBLIC_API_URL=https://你的-railway-后端.railway.app
   ```
6. 点击 "Deploy"
7. 部署完成后，你会获得一个 URL（如 `https://ofs-portal-xxx.vercel.app`）

#### 4. 更新后端 CORS 配置

回到 Railway，更新 `CORS_ORIGIN` 环境变量为你的 Vercel 域名：
```
CORS_ORIGIN=https://ofs-portal-xxx.vercel.app
```

---

### 方案二：使用 CLI 部署（快速测试）

#### 1. 部署前端到 Vercel

```bash
# 在项目根目录
cd frontend

# 登录 Vercel（首次使用）
vercel login

# 部署到预览环境
vercel

# 部署到生产环境
vercel --prod
```

按照提示操作，部署完成后会获得一个 URL。

#### 2. 部署后端到 Railway

```bash
# 安装 Railway CLI
brew install railway  # macOS
# 或
npm install -g @railway/cli

# 登录
railway login

# 在项目根目录
cd backend

# 初始化项目
railway init

# 添加 PostgreSQL
railway add --plugin postgresql

# 设置环境变量
railway variables set PORT=3001
railway variables set CORS_ORIGIN=https://你的-vercel-域名.vercel.app

# 部署
railway up
```

---

## 🔧 环境变量配置

### 前端环境变量（Vercel）

在 Vercel 项目设置 → Environment Variables 中添加：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `NEXT_PUBLIC_API_URL` | `https://xxx.railway.app` | 后端 API 地址 |

### 后端环境变量（Railway）

Railway 会自动配置数据库，你只需添加：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `PORT` | `3001` | 端口号（Railway 会自动处理） |
| `CORS_ORIGIN` | `https://xxx.vercel.app` | 前端域名，允许跨域 |

---

## 📱 分享访问链接

部署完成后，你将获得：

- **前端访问地址**: `https://your-project.vercel.app`
- **后端 API 地址**: `https://your-project.railway.app`

只需将前端地址分享给外部用户即可！

---

## 🎯 自定义域名（可选）

### Vercel 自定义域名

1. 在 Vercel 项目设置 → Domains
2. 添加你的域名（如 `portal.yourdomain.com`）
3. 按照提示配置 DNS 记录
4. Vercel 会自动配置 HTTPS 证书

### Railway 自定义域名

1. 在 Railway 项目设置 → Domains
2. 添加自定义域名
3. 配置 CNAME 记录

---

## 🔍 验证部署

### 测试后端

```bash
curl https://your-backend.railway.app
```

应该返回 `Hello World!`（如果你的后端有根路由）

### 测试前端

访问 `https://your-project.vercel.app`，应该能看到完整的前端页面。

---

## 📊 监控和日志

### Vercel

- 访问 Vercel Dashboard → 选择项目 → Analytics
- 查看访问量、性能指标

### Railway

- 访问 Railway Dashboard → 选择项目
- 点击 "Deployments" 查看部署日志
- 点击 "Metrics" 查看资源使用情况

---

## 💰 成本说明

- **Vercel**: 
  - 免费版：100GB 带宽/月，足够小型项目
  - 无限制的预览部署

- **Railway**:
  - 免费额度：$5/月
  - 超出后按使用量计费
  - PostgreSQL 数据库包含在内

---

## 🆘 常见问题

### Q: 前端访问后端 API 出现 CORS 错误？

确保后端的 `CORS_ORIGIN` 环境变量设置为前端的完整 URL（包括 `https://`）。

### Q: Railway 部署失败？

检查：
1. `package.json` 中是否有 `start:prod` 脚本
2. 环境变量是否正确配置
3. 查看 Railway 部署日志获取详细错误信息

### Q: Vercel 构建失败？

1. 确保 `Root Directory` 设置为 `frontend`
2. 检查 `package.json` 中的依赖是否完整
3. 查看 Vercel 构建日志

### Q: 如何更新部署？

- **GitHub 自动部署**: 只需 `git push`，Vercel 和 Railway 会自动重新部署
- **CLI 部署**: 重新运行 `vercel --prod` 或 `railway up`

---

## 📚 相关文档

- [Vercel 文档](https://vercel.com/docs)
- [Railway 文档](https://docs.railway.app)
- [Next.js 部署指南](https://nextjs.org/docs/deployment)
- [NestJS 部署指南](https://docs.nestjs.com/faq/serverless)

---

## ✅ 部署检查清单

- [ ] 代码已推送到 GitHub
- [ ] 后端已部署到 Railway
- [ ] PostgreSQL 数据库已添加
- [ ] 后端环境变量已配置（PORT, CORS_ORIGIN）
- [ ] 前端已部署到 Vercel
- [ ] 前端环境变量已配置（NEXT_PUBLIC_API_URL）
- [ ] 测试前端可以正常访问
- [ ] 测试前后端 API 通信正常
- [ ] 分享链接给外部用户

---

**祝部署顺利！如有问题，请查看上述文档或联系技术支持。**
