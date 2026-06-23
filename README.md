# OFS 官方产品资料平台

> 类似高通/NVIDIA 开发者生态的 OFS 官方产品与技术资料门户

## 项目简介

OFS（**Open Full Stack**，开放全栈）产品资料平台是一个统一的产品与技术资料管理系统，旨在解决资料分散、版本不一致、检索困难等问题，为内部团队及未来外部生态提供官方认证的知识数据库。

### 术语说明

- **OFS**: Open Full Stack（开放全栈）- 开放式全栈解决方案
- **COB**: Chip On Board（板上芯片）- 芯片直接封装在电路板上的技术
- **BRD**: Bsw Reference Design（基础软件参考设计）- 基础软件层的标准参考设计
- **Spec**: Specification（技术规格）- 产品技术规格文档
- **ADCU**: Advanced Driver Control Unit（高级驾驶控制单元）- 自动驾驶域控制器

## 核心功能

- 📦 **产品管理** - OFS 产品列表、详情、架构图、Spec 管理
- 📡 **传感器管理** - 主线传感器信息、厂商管理
- 🔗 **兼容性矩阵** - 产品-传感器适配关系可视化
- 📄 **文档中心** - BRD、Spec、参考设计的权限化管理
- 🔍 **全站搜索** - 多条件筛选、全文检索
- ❓ **FAQ 系统** - 常见问题沉淀与知识管理
- 🔐 **权限管理** - 基于角色的访问控制 (RBAC)
- 👥 **用户管理** - 内部/外部用户、团队协作

## 技术栈

### 后端
- **框架**: NestJS (Node.js + TypeScript)
- **数据库**: PostgreSQL 14
- **缓存**: Redis 7
- **搜索**: Elasticsearch 8
- **文件存储**: MinIO
- **认证**: JWT + RBAC

### 前端
- **框架**: Next.js 14 (React 18 + TypeScript)
- **UI**: Ant Design 5 + Tailwind CSS
- **状态管理**: Zustand + React Query
- **图表**: ECharts

### 基础设施
- **容器化**: Docker + Docker Compose
- **开发工具**: ESLint + Prettier

## 快速开始

### 前置要求

- Node.js 18+
- Docker & Docker Compose
- npm 或 yarn

### 安装步骤

1. **克隆仓库**
   ```bash
   git clone <repository-url>
   cd ofs-portal
   ```

2. **启动基础设施服务**
   ```bash
   docker-compose up -d
   ```

   这将启动 PostgreSQL、Redis、MinIO、Elasticsearch 服务。

3. **安装后端依赖**
   ```bash
   cd backend
   npm install
   ```

4. **配置环境变量**
   ```bash
   cp .env.example .env
   # 编辑 .env 文件，配置数据库连接等信息
   ```

5. **运行数据库迁移**
   ```bash
   npm run migration:run
   ```

6. **启动后端服务**
   ```bash
   npm run start:dev
   ```

   后端服务将在 http://localhost:3001 启动

7. **安装前端依赖**
   ```bash
   cd ../frontend
   npm install
   ```

8. **启动前端服务**
   ```bash
   npm run dev
   ```

   前端服务将在 http://localhost:3000 启动

### 访问应用

- **用户门户**: http://localhost:3000
- **管理后台**: http://localhost:3000/admin
- **API 文档**: http://localhost:3001/api-docs
- **MinIO 控制台**: http://localhost:9001 (minioadmin/minioadmin)

## 项目结构

```
ofs-portal/
├── backend/                 # NestJS 后端服务
│   ├── src/
│   │   ├── modules/        # 业务模块
│   │   ├── common/         # 公共模块
│   │   ├── config/         # 配置
│   │   └── database/       # 数据库迁移
│   ├── test/               # 测试文件
│   └── package.json
├── frontend/               # Next.js 前端应用
│   ├── app/                # App Router
│   │   ├── (portal)/      # 用户门户
│   │   └── (admin)/       # 管理后台
│   ├── components/         # React 组件
│   ├── lib/                # 工具库
│   └── package.json
├── docker/                 # Docker 配置
├── docs/                   # 文档
├── docker-compose.yml      # 开发环境配置
└── README.md
```

## 开发指南

### 后端开发

```bash
cd backend

# 开发模式（热重载）
npm run start:dev

# 生成新模块
npm run nest g module modules/example
npm run nest g controller modules/example
npm run nest g service modules/example

# 生成数据库迁移
npm run migration:generate -- -n CreateExampleTable

# 运行测试
npm run test
```

### 前端开发

```bash
cd frontend

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 代码检查
npm run lint
```

### 数据库管理

```bash
# 运行迁移
npm run migration:run

# 回滚迁移
npm run migration:revert

# 初始化种子数据
npm run seed
```

## API 文档

访问 http://localhost:3001/api-docs 查看完整的 API 文档（Swagger UI）。

主要 API 端点：

- `GET /api/products` - 获取产品列表
- `GET /api/products/:id` - 获取产品详情
- `GET /api/sensors` - 获取传感器列表
- `GET /api/compatibility/matrix` - 获取兼容性矩阵
- `GET /api/documents` - 获取文档列表
- `POST /api/auth/login` - 用户登录

## 部署到公网（分享给外部用户）

### 🚀 快速部署（推荐）

部署到 Vercel（前端）+ Railway（后端），完全免费：

```bash
# 查看分步命令
cat DEPLOY_COMMANDS.md

# 或使用自动化脚本
./deploy.sh
```

**3 分钟内完成部署！** 详见：
- 📝 [分步部署命令](./DEPLOY_COMMANDS.md) - 复制粘贴即可
- 🚀 [快速部署指南](./QUICK_DEPLOY.md) - 3 分钟上手
- 📚 [完整部署文档](./DEPLOYMENT_GUIDE.md) - 详细说明

### 本地开发部署

```bash
# 构建镜像
docker-compose -f docker-compose.prod.yml build

# 启动服务
docker-compose -f docker-compose.prod.yml up -d
```

## 测试

```bash
# 后端单元测试
cd backend && npm run test

# 后端 E2E 测试
cd backend && npm run test:e2e

# 前端测试
cd frontend && npm run test
```

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 版本历史

- **v1.0.0** (MVP) - 2024-03
  - ✅ 产品管理
  - ✅ 传感器管理
  - ✅ 兼容性矩阵
  - ✅ 文档管理
  - ✅ 搜索功能
  - ✅ 权限系统

## 路线图

- **v1.1** - FAQ 模块增强
- **v1.2** - Case 系统集成
- **v2.0** - 外部开放、合作伙伴支持
- **v3.0** - AI 智能问答

## License

MIT License

## 联系方式

- 项目负责人: [Your Name]
- 技术支持: [Support Email]
- 文档: [Documentation URL]

---

Built with ❤️ for OFS Community
