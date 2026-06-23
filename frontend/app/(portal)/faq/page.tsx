'use client'

import { useState } from 'react'
import { Card, Input, Collapse, Tag, Space, Typography, Button, Row, Col, Tabs, Empty, Badge } from 'antd'
import { SearchOutlined, QuestionCircleOutlined, LikeOutlined, EyeOutlined, FileTextOutlined, ToolOutlined, BugOutlined, SafetyOutlined, ApiOutlined } from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography
const { Panel } = Collapse

// 模拟 FAQ 数据
const mockFAQs = [
  {
    id: '1',
    question: 'OFS（Open Full Stack）是什么？',
    answer: 'OFS（Open Full Stack，开放全栈）是一个开放式全栈解决方案，提供从底层硬件到上层应用的完整技术栈。OFS 平台包含自动驾驶域控制器（ADCU）、板上芯片（COB）平台、基础软件参考设计（BRD）等核心产品和技术资料。',
    category: '产品相关',
    tags: ['OFS', '产品定义', '基础概念'],
    relatedProduct: null,
    views: 1234,
    helpful: 89,
    updatedAt: '2024-03-10'
  },
  {
    id: '2',
    question: 'COB N 支持哪些主线传感器？',
    answer: 'COB N（板上芯片新一代）平台当前支持以下主线传感器：\n\n1. **摄像头**：华依 8MP、安森美 AR0820\n2. **毫米波雷达**：大陆 ARS548、博世 MRR\n3. **激光雷达**：速腾聚创 RS-LiDAR-M1、禾赛 AT128（测试中）\n\n详细的兼容性信息和版本要求请查看"兼容性矩阵"页面。',
    category: '技术集成',
    tags: ['COB N', '传感器', '兼容性'],
    relatedProduct: 'OFS-COB-N',
    views: 892,
    helpful: 67,
    updatedAt: '2024-03-08'
  },
  {
    id: '3',
    question: '如何下载 BRD（基础软件参考设计）文档？',
    answer: 'BRD（Bsw Reference Design，基础软件参考设计）文档的下载步骤：\n\n1. 访问"文档中心"页面\n2. 在文档类型筛选中选择"BRD"\n3. 找到目标产品的 BRD 文档\n4. 点击"下载"按钮\n\n**注意**：BRD 文档通常标记为"受限"权限，仅限特定角色（FO、RD）访问。如需权限请联系团队负责人。',
    category: '文档下载',
    tags: ['BRD', '文档', '权限'],
    relatedProduct: null,
    views: 756,
    helpful: 54,
    updatedAt: '2024-03-05'
  },
  {
    id: '4',
    question: 'ADCU-G3 与 ADCU-G2 的主要区别是什么？',
    answer: 'OFS-ADCU-G3 Plus 相比 ADCU-G2 Standard 的主要升级：\n\n**硬件升级**：\n- 算力提升至 254 TOPS（G2 为 100 TOPS）\n- 基于 COB N 新一代架构（G2 为 COB）\n- 支持更多传感器输入（8 路摄像头 vs 6 路）\n\n**软件特性**：\n- 支持 L4 级别自动驾驶（G2 支持 L2-L3）\n- 更强的多传感器融合能力\n- 优化的功耗控制\n\n详细对比请查看产品详情页的技术规格部分。',
    category: '产品相关',
    tags: ['ADCU', 'G3', 'G2', '对比'],
    relatedProduct: 'OFS-ADCU-G3',
    views: 1045,
    helpful: 78,
    updatedAt: '2024-03-01'
  },
  {
    id: '5',
    question: '华依传感器在 COB N 上的适配状态？',
    answer: '华依传感器在 COB N 平台上的适配状态：\n\n**华依 8MP 摄像头**：\n- 状态：✅ 已支持\n- 最低版本：v1.8+\n- 验证日期：2024-03-08\n- 说明：完全支持，已通过所有功能和性能测试\n\n**注意**：早期版本（v1.7 及以下）可能存在时间同步问题，建议升级到 v1.8 或更高版本。\n\n更多传感器适配信息请访问"兼容性矩阵"页面。',
    category: '问题排查',
    tags: ['华依', 'COB N', '适配', '传感器'],
    relatedProduct: 'OFS-COB-N',
    views: 623,
    helpful: 45,
    updatedAt: '2024-02-28'
  },
  {
    id: '6',
    question: '如何申请受限文档的访问权限？',
    answer: '申请受限文档访问权限的流程：\n\n**方式一：通过团队负责人**\n1. 联系您的直属主管或团队负责人\n2. 说明需要访问的文档和业务原因\n3. 负责人在系统中为您分配相应角色权限\n\n**方式二：系统申请**\n1. 访问"文档中心"页面\n2. 点击受限文档的"申请权限"按钮\n3. 填写申请表单，说明用途\n4. 等待审批（通常 1-2 个工作日）\n\n**权限级别说明**：\n- 内部文档：公司员工自动拥有\n- 受限文档：需要 FO、RD、SQA 等特定角色\n- 机密文档：需要特殊审批',
    category: '权限申请',
    tags: ['权限', '文档', '申请流程'],
    relatedProduct: null,
    views: 534,
    helpful: 42,
    updatedAt: '2024-02-25'
  },
  {
    id: '7',
    question: 'Spec 文档的版本号如何解读？',
    answer: 'Spec（技术规格）文档采用语义化版本控制（Semantic Versioning）：\n\n**格式**：MAJOR.MINOR.PATCH（如 v2.3.1）\n\n- **MAJOR（主版本号）**：重大架构变更或不兼容更新\n  - 例：v1.x → v2.x 表示架构升级\n- **MINOR（次版本号）**：向下兼容的功能新增\n  - 例：v2.2 → v2.3 表示新增功能\n- **PATCH（修订号）**：向下兼容的问题修复\n  - 例：v2.3.0 → v2.3.1 表示 bug 修复\n\n**建议**：\n- 生产环境使用稳定版本（如 v2.3.1）\n- 开发环境可以尝试最新版本\n- 关注版本变更日志了解具体变化',
    category: '文档相关',
    tags: ['Spec', '版本', '语义化版本'],
    relatedProduct: null,
    views: 445,
    helpful: 38,
    updatedAt: '2024-02-20'
  },
  {
    id: '8',
    question: '如何报告产品问题或提交 Case？',
    answer: '报告产品问题或提交技术支持 Case 的步骤：\n\n**在线提交**（推荐）：\n1. 登录 OFS 产品资料平台\n2. 访问"技术支持"或"提交 Case"页面\n3. 填写问题描述、选择相关产品和传感器\n4. 上传日志、配置文件或截图\n5. 提交后会收到 Case 编号和预计响应时间\n\n**邮件提交**：\n发送邮件至 support@ofs.example.com，包含：\n- 产品型号和版本\n- 问题描述\n- 复现步骤\n- 环境信息（操作系统、固件版本等）\n- 相关日志\n\n**紧急问题**：\n拨打 7x24 小时支持热线（仅限生产环境重大问题）',
    category: '技术支持',
    tags: ['Case', '问题报告', '技术支持'],
    relatedProduct: null,
    views: 678,
    helpful: 56,
    updatedAt: '2024-02-15'
  },
]

const categories = [
  { key: 'all', label: '全部问题', icon: <QuestionCircleOutlined />, count: mockFAQs.length },
  { key: '产品相关', label: '产品相关', icon: <FileTextOutlined />, count: mockFAQs.filter(f => f.category === '产品相关').length },
  { key: '技术集成', label: '技术集成', icon: <ToolOutlined />, count: mockFAQs.filter(f => f.category === '技术集成').length },
  { key: '文档下载', label: '文档下载', icon: <FileTextOutlined />, count: mockFAQs.filter(f => f.category === '文档下载').length },
  { key: '问题排查', label: '问题排查', icon: <BugOutlined />, count: mockFAQs.filter(f => f.category === '问题排查').length },
  { key: '权限申请', label: '权限申请', icon: <SafetyOutlined />, count: mockFAQs.filter(f => f.category === '权限申请').length },
  { key: '技术支持', label: '技术支持', icon: <ApiOutlined />, count: mockFAQs.filter(f => f.category === '技术支持').length },
]

export default function FAQPage() {
  const [searchText, setSearchText] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'views' | 'helpful'>('views')

  const filteredFAQs = mockFAQs
    .filter(faq => {
      const matchesSearch = searchText === '' ||
        faq.question.toLowerCase().includes(searchText.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchText.toLowerCase()) ||
        faq.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase()))
      const matchesCategory = categoryFilter === 'all' || faq.category === categoryFilter
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => b[sortBy] - a[sortBy])

  const handleHelpful = (faqId: string) => {
    alert(`感谢您的反馈！FAQ ID: ${faqId}`)
  }

  return (
    <div className="page-content" style={{ background: '#f0f2f5', padding: '24px' }}>
      <div className="container-custom">
        {/* Page Header */}
        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <QuestionCircleOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
          <Title level={2}>常见问题 (FAQ)</Title>
          <Paragraph style={{ color: '#666', fontSize: '16px' }}>
            快速找到关于 OFS 产品、技术集成、文档下载等方面的常见问题解答
          </Paragraph>
        </div>

        {/* Search Bar */}
        <Card style={{ marginBottom: '24px' }}>
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <Input
              placeholder="搜索您的问题..."
              prefix={<SearchOutlined />}
              size="large"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <Text type="secondary">
                找到 <Text strong>{filteredFAQs.length}</Text> 个相关问题
              </Text>
              <Space>
                <Text type="secondary">排序：</Text>
                <Button
                  type={sortBy === 'views' ? 'primary' : 'default'}
                  size="small"
                  onClick={() => setSortBy('views')}
                >
                  最多浏览
                </Button>
                <Button
                  type={sortBy === 'helpful' ? 'primary' : 'default'}
                  size="small"
                  onClick={() => setSortBy('helpful')}
                >
                  最有帮助
                </Button>
              </Space>
            </div>
          </Space>
        </Card>

        <Row gutter={24}>
          {/* Left Sidebar - Categories */}
          <Col xs={24} md={6}>
            <Card title="问题分类" style={{ marginBottom: '24px' }}>
              <Space direction="vertical" style={{ width: '100%' }} size="small">
                {categories.map(cat => (
                  <Button
                    key={cat.key}
                    type={categoryFilter === cat.key ? 'primary' : 'text'}
                    block
                    style={{ textAlign: 'left', height: 'auto', padding: '8px 16px' }}
                    onClick={() => setCategoryFilter(cat.key)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Space>
                        {cat.icon}
                        <span>{cat.label}</span>
                      </Space>
                      <Badge count={cat.count} style={{ backgroundColor: categoryFilter === cat.key ? '#fff' : '#1890ff' }} />
                    </div>
                  </Button>
                ))}
              </Space>
            </Card>

            <Card title="快速链接">
              <Space direction="vertical" style={{ width: '100%' }} size="small">
                <Button type="link" block style={{ textAlign: 'left' }}>提交新问题</Button>
                <Button type="link" block style={{ textAlign: 'left' }}>联系技术支持</Button>
                <Button type="link" block style={{ textAlign: 'left' }}>查看文档中心</Button>
              </Space>
            </Card>
          </Col>

          {/* Main Content - FAQ List */}
          <Col xs={24} md={18}>
            {filteredFAQs.length > 0 ? (
              <Collapse
                accordion
                expandIconPosition="end"
                style={{ background: 'transparent', border: 'none' }}
              >
                {filteredFAQs.map((faq) => (
                  <Panel
                    key={faq.id}
                    header={
                      <div>
                        <Space style={{ marginBottom: '8px' }}>
                          <Tag color="blue">{faq.category}</Tag>
                          {faq.relatedProduct && (
                            <Tag color="green">{faq.relatedProduct}</Tag>
                          )}
                        </Space>
                        <div style={{ fontSize: '16px', fontWeight: 500 }}>
                          {faq.question}
                        </div>
                        <Space style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>
                          <span><EyeOutlined /> {faq.views}</span>
                          <span><LikeOutlined /> {faq.helpful} 人觉得有用</span>
                          <span>更新于 {faq.updatedAt}</span>
                        </Space>
                      </div>
                    }
                    style={{ marginBottom: '16px', background: '#fff', borderRadius: '8px', border: '1px solid #f0f0f0' }}
                  >
                    <div style={{ padding: '16px 0' }}>
                      <Paragraph style={{ whiteSpace: 'pre-line', fontSize: '15px', lineHeight: '1.8' }}>
                        {faq.answer}
                      </Paragraph>

                      <div style={{ marginTop: '16px' }}>
                        <Space wrap>
                          {faq.tags.map(tag => (
                            <Tag key={tag}>{tag}</Tag>
                          ))}
                        </Space>
                      </div>

                      <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #f0f0f0' }}>
                        <Text type="secondary">这个答案对您有帮助吗？</Text>
                        <Space style={{ marginLeft: '16px' }}>
                          <Button
                            type="primary"
                            size="small"
                            icon={<LikeOutlined />}
                            onClick={() => handleHelpful(faq.id)}
                          >
                            有帮助
                          </Button>
                          <Button size="small">需要更多帮助</Button>
                        </Space>
                      </div>
                    </div>
                  </Panel>
                ))}
              </Collapse>
            ) : (
              <Card>
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <div>
                      <Text>未找到匹配的问题</Text>
                      <div style={{ marginTop: '16px' }}>
                        <Button type="primary" onClick={() => setSearchText('')}>
                          清除搜索
                        </Button>
                        <Button style={{ marginLeft: '8px' }}>提交新问题</Button>
                      </div>
                    </div>
                  }
                />
              </Card>
            )}
          </Col>
        </Row>

        {/* Bottom CTA */}
        <Card style={{ marginTop: '24px', textAlign: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <div style={{ color: 'white', padding: '24px' }}>
            <Title level={3} style={{ color: 'white' }}>没有找到您的问题？</Title>
            <Paragraph style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '16px', marginBottom: '24px' }}>
              我们的技术支持团队随时准备为您提供帮助
            </Paragraph>
            <Space size="large">
              <Button size="large" type="primary" ghost>
                提交技术支持 Case
              </Button>
              <Button size="large" style={{ background: 'white', color: '#667eea', border: 'none' }}>
                联系我们
              </Button>
            </Space>
          </div>
        </Card>
      </div>
    </div>
  )
}
