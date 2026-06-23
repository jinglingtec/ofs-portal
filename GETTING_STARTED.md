# OFS 产品资料平台 - 快速开始指南

## 📖 术语说明

- **OFS**: Open Full Stack（开放全栈）- 开放式全栈解决方案
- **COB**: Chip On Board（板上芯片）- 芯片直接封装在电路板上的技术
- **BRD**: Bsw Reference Design（基础软件参考设计）- 基础软件层的标准参考设计
- **ADCU**: Advanced Driver Control Unit（高级驾驶控制单元）- 自动驾驶域控制器
- **Spec**: Specification（技术规格）- 产品技术规格文档

---

## 🎯 当前项目状态

### ✅ 已完成
- ✅ 完整的技术架构设计文档
- ✅ 后端项目（NestJS）已初始化
- ✅ 前端项目（Next.js）已初始化
- ✅ 前端核心页面已创建
  - 首页（Hero + 统计 + 快速入口）
  - 产品列表页（卡片/列表视图切换）
  - 响应式导航布局
- ✅ Docker Compose 基础设施配置
- ✅ 前端开发服务器正在运行 ✨

### 🔄 进行中
- 🔄 后端 API 开发（待开始）
- 🔄 数据库迁移文件（待创建）
- 🔄 更多前端页面（传感器、兼容性矩阵等）

---

## 🚀 快速启动

### 访问前端应用

前端开发服务器已启动，访问：

```
http://localhost:3000
```

**主要页面：**
- 首页：http://localhost:3000/
- 产品中心：http://localhost:3000/products

### 查看设计文档

```bash
# 查看完整的技术架构和实施计划
cat /Users/hubing/.claude/plans/dazzling-painting-sloth.md
```

---

## 📁 项目结构

```
/Users/hubing/workspace/ofs/
├── README.md                    # 项目主文档
├── GETTING_STARTED.md           # 本文档
├── docker-compose.yml           # Docker 基础设施配置
│
├── backend/                     # NestJS 后端服务
│   ├── src/
│   │   ├── app.module.ts
│   │   ├── app.controller.ts
│   │   ├── app.service.ts
│   │   └── main.ts
│   ├── package.json
│   └── node_modules/            ✅ 依赖已安装
│
└── frontend/                    # Next.js 前端应用
    ├── app/
    │   ├── globals.css          ✅ 全局样式
    │   ├── layout.tsx           ✅ 根布局
    │   └── (portal)/
    │       ├── layout.tsx       ✅ 门户布局（导航栏）
    │       ├── page.tsx         ✅ 首页
    │       └── products/
    │           └── page.tsx     ✅ 产品列表页
    ├── components/              📁 组件目录
    ├── lib/                     📁 工具库目录
    ├── types/                   📁 类型定义目录
    ├── package.json             ✅ 依赖配置
    ├── tsconfig.json            ✅ TypeScript 配置
    ├── next.config.js           ✅ Next.js 配置
    └── node_modules/            ✅ 依赖已安装
```

---

## 🛠️ 开发命令

### 前端开发

```bash
cd /Users/hubing/workspace/ofs/frontend

# 开发模式（已运行）
npm run dev              # http://localhost:3000

# 构建生产版本
npm run build

# 运行生产版本
npm start

# 代码检查
npm run lint
```

### 后端开发

```bash
cd /Users/hubing/workspace/ofs/backend

# 开发模式（热重载）
npm run start:dev        # http://localhost:3001

# 生产模式
npm run start:prod

# 运行测试
npm run test

# E2E 测试
npm run test:e2e
```

### Docker 基础设施

```bash
cd /Users/hubing/workspace/ofs

# 启动所有服务（需要 Docker）
docker compose up -d

# 查看服务状态
docker compose ps

# 停止所有服务
docker compose down

# 查看日志
docker compose logs -f
```

**服务访问地址：**
- PostgreSQL: localhost:5432
- Redis: localhost:6379
- MinIO 控制台: http://localhost:9001 (minioadmin/minioadmin)
- Elasticsearch: http://localhost:9200

---

## 🎨 已实现的功能展示

### 1. 首页 (/)
- ✅ Hero Section（品牌宣传）
- ✅ 统计数据展示（产品、传感器、文档、FAQ 数量）
- ✅ 快速入口卡片（产品中心、兼容性矩阵、文档中心）
- ✅ 最近更新列表（产品更新、文档更新）

### 2. 产品列表页 (/products)
- ✅ 搜索功能（按产品名称/代号搜索）
- ✅ 状态筛选（全部/已发布/已废弃/开发中）
- ✅ 视图切换（卡片视图 / 列表视图）
- ✅ 产品卡片展示
  - 产品名称、描述
  - 状态标签、平台标签
  - 版本信息、支持的传感器数量
  - 更新时间
  - 操作按钮（查看详情、下载 Spec）

### 3. 全局布局
- ✅ 顶部导航栏
  - Logo 和品牌名称
  - 菜单导航（首页、产品、传感器、兼容性、文档、FAQ）
  - 搜索框
  - 通知图标
  - 用户头像和下拉菜单
- ✅ 页脚（版权信息）

---

## 📋 接下来的开发任务

### 阶段 1：完善前端页面（1-2天）

**优先级 P0：**
1. [ ] 产品详情页 (`/products/[id]/page.tsx`)
   - 产品完整信息展示
   - 架构图显示
   - 支持的传感器列表
   - 版本历史
   - 相关文档下载

2. [ ] 传感器列表页 (`/sensors/page.tsx`)
   - 类似产品列表页的布局
   - 按厂商、类型筛选
   - 传感器卡片展示

3. [ ] 兼容性矩阵页 (`/compatibility/page.tsx`)
   - 表格视图展示产品-传感器兼容性
   - 筛选器（产品、平台、编译器版本）
   - 状态颜色标识
   - 导出功能

4. [ ] 文档中心页 (`/documents/page.tsx`)
   - 文档列表展示
   - 按类型分类（Spec、BRD、参考设计、手册）
   - 按产品筛选
   - 权限标识（公开/内部/受限/机密）
   - 下载功能

5. [ ] FAQ 页面 (`/faq/page.tsx`)
   - 搜索功能
   - 按分类浏览
   - 问题详情展开/折叠

### 阶段 2：后端 API 开发（2-3天）

**优先级 P0：**
1. [ ] 数据库配置和连接
   - TypeORM 配置
   - 连接 PostgreSQL

2. [ ] 创建数据库实体（Entities）
   - Product Entity
   - Sensor Entity
   - Compatibility Entity
   - Document Entity
   - User Entity
   - Role & Permission Entities

3. [ ] 创建数据库迁移文件
   - 初始化数据库表结构
   - 创建索引
   - 创建外键关系

4. [ ] 实现核心模块
   - Product Module（CRUD API）
   - Sensor Module（CRUD API）
   - Compatibility Module（矩阵查询 API）
   - Document Module（文件上传/下载 API）

5. [ ] 认证模块
   - JWT 认证
   - 登录/登出 API
   - 用户注册 API

6. [ ] Swagger API 文档
   - 配置 @nestjs/swagger
   - 添加 API 注解

### 阶段 3：前后端集成（1-2天）

1. [ ] 创建前端 API 客户端
   - `lib/api/client.ts`（Axios 封装）
   - `lib/api/product.ts`
   - `lib/api/sensor.ts`
   - `lib/api/compatibility.ts`
   - `lib/api/document.ts`
   - `lib/api/auth.ts`

2. [ ] 集成真实数据
   - 产品列表从后端获取
   - 产品详情从后端获取
   - 其他页面同理

3. [ ] 实现认证流程
   - 登录页面
   - Token 存储和刷新
   - 受保护路由

### 阶段 4：搜索和权限（1-2天）

1. [ ] 集成 Elasticsearch
   - 索引产品数据
   - 索引传感器数据
   - 索引文档数据
   - 实现全文搜索 API

2. [ ] 实现权限系统
   - RBAC 权限中间件
   - 前端权限控制
   - 文档下载权限检查

### 阶段 5：管理后台（2-3天）

1. [ ] 管理后台布局
2. [ ] 产品管理页面
3. [ ] 传感器管理页面
4. [ ] 文档管理页面
5. [ ] 用户管理页面
6. [ ] 权限管理页面

---

## 🔍 当前可用的演示数据

前端页面使用了模拟数据（Mock Data）用于演示：

**产品列表：**
- OFS-ADCU-G3 Plus
- OFS-ADCU-G2 Standard
- OFS-COB-N Platform
- OFS-ADCU-G1 Legacy

**统计数据：**
- 产品数量：12
- 传感器：45
- 文档资料：125
- FAQ 条目：68

---

## 📚 相关文档

- **技术架构设计**：`/Users/hubing/.claude/plans/dazzling-painting-sloth.md`
- **项目主文档**：`README.md`
- **API 文档**：启动后端后访问 http://localhost:3001/api-docs
- **数据库 ER 图**：见技术架构文档第二章

---

## 🐛 已知问题和解决方案

### 问题 1：Docker 服务未启动
**现象**：无法连接数据库、Redis 等服务

**解决方案**：
```bash
# 安装 Docker Desktop（如果还没安装）
# 然后启动 Docker 服务

# 启动基础设施服务
cd /Users/hubing/workspace/ofs
docker compose up -d
```

### 问题 2：前端端口被占用
**现象**：`Error: listen EADDRINUSE: address already in use :::3000`

**解决方案**：
```bash
# 查找占用端口的进程
lsof -ti:3000

# 杀掉进程
kill -9 $(lsof -ti:3000)

# 或者使用其他端口
npm run dev -- -p 3001
```

### 问题 3：npm 依赖安装失败
**解决方案**：
```bash
# 清理缓存
npm cache clean --force

# 删除 node_modules
rm -rf node_modules package-lock.json

# 重新安装
npm install
```

---

## 💡 开发建议

1. **使用 VS Code**
   - 安装推荐扩展：
     - ESLint
     - Prettier
     - TypeScript Vue Plugin (Volar)
     - Tailwind CSS IntelliSense

2. **开发时保持服务运行**
   - 前端：`npm run dev` (端口 3000)
   - 后端：`npm run start:dev` (端口 3001)
   - Docker：`docker compose up -d`

3. **遵循代码规范**
   - 使用 TypeScript 类型
   - 遵循 ESLint 规则
   - 使用 Prettier 格式化代码

4. **Git 提交规范**
   - feat: 新功能
   - fix: 修复
   - docs: 文档
   - style: 样式
   - refactor: 重构
   - test: 测试
   - chore: 构建/工具

---

## 🎯 下一步操作建议

**立即可做：**

1. **查看前端效果**
   ```
   浏览器访问：http://localhost:3000
   ```

2. **继续开发前端页面**
   - 创建产品详情页
   - 创建传感器列表页
   - 创建兼容性矩阵页

3. **开始后端开发**
   - 创建数据库实体
   - 实现产品 CRUD API
   - 测试 API

---

## 📞 需要帮助？

如果遇到问题或需要继续开发，告诉我：
- 你想开发哪个功能
- 遇到了什么错误
- 需要什么帮助

**常见请求示例：**
- "创建产品详情页"
- "实现后端产品 API"
- "创建数据库迁移文件"
- "添加搜索功能"
- "实现用户登录"

---

**祝开发顺利！🚀**
