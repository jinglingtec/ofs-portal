# OFS 产品资料平台 - 术语表

本文档提供项目中使用的核心术语和缩写的完整定义。

---

## 核心术语

### OFS (Open Full Stack)
**全称**: Open Full Stack
**中文**: 开放全栈
**说明**: 开放式全栈解决方案，提供从底层硬件到上层应用的完整技术栈。

### COB (Chip On Board)
**全称**: Chip On Board
**中文**: 板上芯片
**说明**: 一种芯片封装技术，芯片直接封装在电路板（PCB）上，而不使用传统的封装形式。具有体积小、散热好、成本低等优点。

**相关术语**:
- **COB N**: COB 新一代平台（N 代表 New/Next generation）

### BRD (Bsw Reference Design)
**全称**: Bsw Reference Design
**中文**: 基础软件参考设计
**说明**: 基础软件层（Basic Software）的标准参考设计文档，包含软件架构、接口定义、实现规范等。

**特点**:
- 提供标准化的基础软件实现方案
- 帮助快速开发和集成
- 确保软件质量和可维护性

---

## 产品相关术语

### ADCU (Advanced Driver Control Unit)
**全称**: Advanced Driver Control Unit
**中文**: 高级驾驶控制单元
**说明**: 自动驾驶域控制器，用于处理自动驾驶相关的计算任务。

**产品示例**:
- OFS-ADCU-G3 Plus
- OFS-ADCU-G2 Standard
- OFS-ADCU-G1 Legacy

### Spec (Specification)
**全称**: Specification
**中文**: 技术规格
**说明**: 产品的详细技术规格文档，包含功能定义、性能指标、接口说明、测试要求等。

**典型内容**:
- 功能需求
- 性能指标
- 接口定义
- 测试规范
- 版本历史

---

## 传感器相关术语

### 传感器类型

#### Camera（摄像头）
用于图像采集的视觉传感器。

#### LiDAR（激光雷达）
**全称**: Light Detection and Ranging
使用激光进行距离测量和环境感知的传感器。

#### Radar（雷达）
**全称**: Radio Detection and Ranging
使用无线电波进行目标检测和测距的传感器。

#### Ultrasonic（超声波）
使用超声波进行近距离障碍物检测的传感器。

---

## 平台相关术语

### SOC (System on Chip)
**全称**: System on Chip
**中文**: 系统级芯片
**说明**: 将完整系统集成在单个芯片上的技术。

### 编译器版本
用于将源代码编译为可执行文件的工具链版本标识。

**示例**:
- v2.3.1
- v3.1.2

---

## 文档类型

### Spec (技术规格)
产品的详细技术规格文档。

### BRD (基础软件参考设计)
基础软件层的标准参考设计。

### Reference Design（参考设计）
完整的硬件和软件参考实现，可作为产品开发的起点。

### User Manual（用户手册）
面向最终用户的产品使用说明文档。

### API Documentation（API 文档）
软件接口的详细说明文档。

---

## 权限级别

### Public（公开）
对所有人开放的资料。

### Internal（内部）
仅限公司内部员工访问的资料。

### Restricted（受限）
需要特定角色或权限才能访问的资料。

### Confidential（机密）
高度敏感的机密资料，仅限授权人员访问。

---

## 产品状态

### Active（已发布）
当前正在维护和支持的产品。

### Deprecated（已废弃）
不再推荐使用但仍提供有限支持的产品。

### Developing（开发中）
正在开发尚未正式发布的产品。

### EOL (End of Life)
**全称**: End of Life
已停止支持的产品。

---

## 兼容性状态

### Supported（已支持）
已完成适配和验证，可正常使用。

### In Progress（适配中）
正在进行适配工作，尚未完成。

### Not Supported（不支持）
当前不支持或不计划支持。

### Deprecated（已废弃）
曾经支持但现已废弃的适配。

---

## 角色定义

### FO (Function Owner)
**全称**: Function Owner
**中文**: 产品经理 / 功能负责人
**职责**: 负责产品定义、需求管理、产品规划。

### RD (Research & Development)
**全称**: Research & Development
**中文**: 研发工程师
**职责**: 负责产品开发、技术实现、bug 修复。

### SQA (Software Quality Assurance)
**全称**: Software Quality Assurance
**中文**: 软件质量保证 / 测试工程师
**职责**: 负责测试、质量保证、问题验证。

### Support（技术支持）
负责客户支持、问题响应、技术咨询。

### Partner（合作伙伴）
外部合作伙伴用户。

---

## 技术架构术语

### RBAC (Role-Based Access Control)
**全称**: Role-Based Access Control
**中文**: 基于角色的访问控制
**说明**: 根据用户角色分配权限的访问控制模型。

### JWT (JSON Web Token)
**全称**: JSON Web Token
**说明**: 一种用于身份认证的 Token 标准。

### API (Application Programming Interface)
**全称**: Application Programming Interface
**中文**: 应用程序编程接口
**说明**: 软件组件之间的接口定义。

### CRUD
**全称**: Create, Read, Update, Delete
**说明**: 数据库的四种基本操作。

---

## 业务流程术语

### Case
技术支持工单，用于跟踪和解决技术问题。

**典型流程**:
1. 客户提交 Case
2. 系统分配给相关人员
3. 问题调查和解决
4. Case 关闭

### FAQ (Frequently Asked Questions)
**全称**: Frequently Asked Questions
**中文**: 常见问题
**说明**: 收集和整理的高频问题及标准答案。

### MVP (Minimum Viable Product)
**全称**: Minimum Viable Product
**中文**: 最小可行产品
**说明**: 具备核心功能、可交付使用的最小产品版本。

---

## 开发相关术语

### OPP (One Pager Project)
**全称**: One Pager Project
项目单页文档，简要描述项目目标、范围、计划。

### PRD (Product Requirements Document)
**全称**: Product Requirements Document
**中文**: 产品需求文档
**说明**: 详细描述产品功能需求、用户场景、验收标准的文档。

### ER Diagram (Entity-Relationship Diagram)
**全称**: Entity-Relationship Diagram
**中文**: 实体关系图
**说明**: 用于数据库设计的图形化表示方法。

---

## 厂商相关

### 华依
传感器供应商名称（示例）。

---

## 版本号规范

### Semantic Versioning
语义化版本控制，格式为：`MAJOR.MINOR.PATCH`

**示例**: v2.3.1
- MAJOR (2): 主版本号，不兼容的重大变更
- MINOR (3): 次版本号，向下兼容的功能新增
- PATCH (1): 修订号，向下兼容的问题修复

---

## 相关缩写

| 缩写 | 全称 | 中文 |
|------|------|------|
| OFS | Open Full Stack | 开放全栈 |
| COB | Chip On Board | 板上芯片 |
| BRD | Bsw Reference Design | 基础软件参考设计 |
| ADCU | Advanced Driver Control Unit | 高级驾驶控制单元 |
| FO | Function Owner | 产品经理/功能负责人 |
| RD | Research & Development | 研发工程师 |
| SQA | Software Quality Assurance | 软件质量保证 |
| RBAC | Role-Based Access Control | 基于角色的访问控制 |
| JWT | JSON Web Token | JSON Web 令牌 |
| API | Application Programming Interface | 应用程序编程接口 |
| FAQ | Frequently Asked Questions | 常见问题 |
| MVP | Minimum Viable Product | 最小可行产品 |
| SOC | System on Chip | 系统级芯片 |
| EOL | End of Life | 生命周期结束 |
| OPP | One Pager Project | 项目单页文档 |
| PRD | Product Requirements Document | 产品需求文档 |
| ER | Entity-Relationship | 实体关系 |

---

## 更新记录

- **2024-03-14**: 初始版本创建
  - 添加核心术语定义
  - 添加产品、传感器、文档相关术语
  - 添加角色和权限相关定义

---

**注意**: 本术语表会随项目发展持续更新。如有新术语需要添加，请提交更新请求。
