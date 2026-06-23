'use client'

import { useState } from 'react'
import { Card, Row, Col, Input, Select, Tag, Button, Space, Typography, List, Avatar, Tooltip, Divider, Empty, Badge } from 'antd'
import { SearchOutlined, DownloadOutlined, EyeOutlined, FileTextOutlined, FilePdfOutlined, FileZipOutlined, FileOutlined, LockOutlined, UnlockOutlined, TeamOutlined } from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

// 模拟文档数据
const mockDocuments = [
  {
    id: '1',
    title: 'OFS-ADCU-G3 Product Specification v2.3',
    type: 'spec',
    productId: '1',
    productName: 'OFS-ADCU-G3',
    version: 'v2.3',
    description: 'OFS-ADCU-G3 Plus 完整产品技术规格文档，包含功能定义、性能指标、接口说明等',
    fileSize: '2.3 MB',
    fileFormat: 'pdf',
    permission: 'internal',
    downloads: 156,
    views: 892,
    updatedAt: '2024-03-10',
    author: '产品团队',
    tags: ['ADCU', 'Spec', 'v2.3']
  },
  {
    id: '2',
    title: 'OFS-ADCU-G3 基础软件参考设计 (BRD) v2.3',
    type: 'brd',
    productId: '1',
    productName: 'OFS-ADCU-G3',
    version: 'v2.3',
    description: '基础软件层（Bsw）的完整参考设计文档，包含软件架构、接口定义、实现规范',
    fileSize: '15.6 MB',
    fileFormat: 'zip',
    permission: 'restricted',
    downloads: 45,
    views: 234,
    updatedAt: '2024-03-10',
    author: '软件团队',
    tags: ['ADCU', 'BRD', 'Bsw', 'v2.3']
  },
  {
    id: '3',
    title: 'OFS-ADCU-G3 硬件设计指南',
    type: 'manual',
    productId: '1',
    productName: 'OFS-ADCU-G3',
    version: 'v2.3',
    description: '硬件设计指南，包含原理图、PCB 布局建议、散热设计等',
    fileSize: '8.2 MB',
    fileFormat: 'pdf',
    permission: 'internal',
    downloads: 89,
    views: 456,
    updatedAt: '2024-02-28',
    author: '硬件团队',
    tags: ['ADCU', 'Hardware', 'Design Guide']
  },
  {
    id: '4',
    title: 'OFS-ADCU-G3 软件集成指南',
    type: 'manual',
    productId: '1',
    productName: 'OFS-ADCU-G3',
    version: 'v2.3',
    description: '软件集成开发指南，包含 SDK 使用、API 说明、示例代码等',
    fileSize: '5.1 MB',
    fileFormat: 'pdf',
    permission: 'internal',
    downloads: 123,
    views: 678,
    updatedAt: '2024-03-01',
    author: '软件团队',
    tags: ['ADCU', 'Software', 'Integration']
  },
  {
    id: '5',
    title: 'OFS-ADCU-G3 系统架构图',
    type: 'other',
    productId: '1',
    productName: 'OFS-ADCU-G3',
    version: 'v2.3',
    description: '系统整体架构图，包含硬件架构、软件架构、数据流等',
    fileSize: '1.2 MB',
    fileFormat: 'pdf',
    permission: 'public',
    downloads: 234,
    views: 1234,
    updatedAt: '2024-03-05',
    author: '架构团队',
    tags: ['ADCU', 'Architecture']
  },
  {
    id: '6',
    title: 'OFS-COB-N 平台技术白皮书',
    type: 'other',
    productId: '3',
    productName: 'OFS-COB-N',
    version: 'v1.8',
    description: 'COB N（板上芯片新一代）平台技术白皮书，介绍平台特性和优势',
    fileSize: '3.5 MB',
    fileFormat: 'pdf',
    permission: 'public',
    downloads: 456,
    views: 2345,
    updatedAt: '2024-03-08',
    author: '平台团队',
    tags: ['COB', 'Platform', 'Whitepaper']
  },
  {
    id: '7',
    title: '传感器适配开发指南 v3.1',
    type: 'manual',
    productId: null,
    productName: '通用文档',
    version: 'v3.1',
    description: '传感器适配的通用开发指南，适用于所有 OFS 产品',
    fileSize: '6.8 MB',
    fileFormat: 'pdf',
    permission: 'internal',
    downloads: 198,
    views: 987,
    updatedAt: '2024-02-25',
    author: '集成团队',
    tags: ['Sensor', 'Integration', 'Guide']
  },
  {
    id: '8',
    title: 'OFS 功能安全设计规范',
    type: 'spec',
    productId: null,
    productName: '通用文档',
    version: 'v2.0',
    description: '功能安全设计规范，符合 ISO 26262 标准要求',
    fileSize: '4.2 MB',
    fileFormat: 'pdf',
    permission: 'restricted',
    downloads: 67,
    views: 345,
    updatedAt: '2024-02-20',
    author: '质量团队',
    tags: ['Safety', 'ISO 26262', 'Standard']
  },
]

export default function DocumentsPage() {
  const [searchText, setSearchText] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [productFilter, setProductFilter] = useState<string>('all')
  const [permissionFilter, setPermissionFilter] = useState<string>('all')

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchText.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchText.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase()))
    const matchesType = typeFilter === 'all' || doc.type === typeFilter
    const matchesProduct = productFilter === 'all' || doc.productName === productFilter
    const matchesPermission = permissionFilter === 'all' || doc.permission === permissionFilter
    return matchesSearch && matchesType && matchesProduct && matchesPermission
  })

  const getFileIcon = (format: string) => {
    switch (format) {
      case 'pdf':
        return <FilePdfOutlined style={{ fontSize: '32px', color: '#ff4d4f' }} />
      case 'zip':
        return <FileZipOutlined style={{ fontSize: '32px', color: '#faad14' }} />
      default:
        return <FileOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
    }
  }

  const getTypeTag = (type: string) => {
    const typeMap: Record<string, { color: string; text: string }> = {
      spec: { color: 'blue', text: 'Spec' },
      brd: { color: 'purple', text: 'BRD' },
      manual: { color: 'green', text: '手册' },
      other: { color: 'default', text: '其他' },
    }
    const config = typeMap[type] || typeMap.other
    return <Tag color={config.color}>{config.text}</Tag>
  }

  const getPermissionInfo = (permission: string) => {
    const permissionMap: Record<string, { icon: any; color: string; text: string; badge: string }> = {
      public: { icon: <UnlockOutlined />, color: '#52c41a', text: '公开', badge: 'success' },
      internal: { icon: <TeamOutlined />, color: '#1890ff', text: '内部', badge: 'processing' },
      restricted: { icon: <LockOutlined />, color: '#faad14', text: '受限', badge: 'warning' },
      confidential: { icon: <LockOutlined />, color: '#ff4d4f', text: '机密', badge: 'error' },
    }
    return permissionMap[permission] || permissionMap.internal
  }

  const handleDownload = (doc: any) => {
    if (doc.permission === 'restricted' || doc.permission === 'confidential') {
      // 模拟权限检查
      alert(`该文档需要 "${getPermissionInfo(doc.permission).text}" 权限才能下载。请联系管理员申请权限。`)
    } else {
      alert(`开始下载: ${doc.title}`)
    }
  }

  // 统计数据
  const stats = {
    total: mockDocuments.length,
    public: mockDocuments.filter(d => d.permission === 'public').length,
    spec: mockDocuments.filter(d => d.type === 'spec').length,
    brd: mockDocuments.filter(d => d.type === 'brd').length,
  }

  return (
    <div className="page-content" style={{ background: '#f0f2f5', padding: '24px' }}>
      <div className="container-custom">
        {/* Page Header */}
        <div style={{ marginBottom: '24px' }}>
          <Title level={2}>文档中心</Title>
          <p style={{ color: '#666', marginTop: '8px' }}>
            浏览和下载 OFS 产品的技术文档，包括 Spec（技术规格）、BRD（基础软件参考设计）、开发指南等
          </p>
        </div>

        {/* Statistics */}
        <Row gutter={16} style={{ marginBottom: '24px' }}>
          <Col xs={12} sm={6}>
            <Card>
              <div style={{ textAlign: 'center' }}>
                <FileTextOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
                <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '8px' }}>
                  {stats.total}
                </div>
                <div style={{ color: '#666', fontSize: '13px' }}>文档总数</div>
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card>
              <div style={{ textAlign: 'center' }}>
                <UnlockOutlined style={{ fontSize: '32px', color: '#52c41a' }} />
                <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '8px' }}>
                  {stats.public}
                </div>
                <div style={{ color: '#666', fontSize: '13px' }}>公开文档</div>
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card>
              <div style={{ textAlign: 'center' }}>
                <FilePdfOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
                <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '8px' }}>
                  {stats.spec}
                </div>
                <div style={{ color: '#666', fontSize: '13px' }}>Spec 文档</div>
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card>
              <div style={{ textAlign: 'center' }}>
                <FileZipOutlined style={{ fontSize: '32px', color: '#722ed1' }} />
                <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '8px' }}>
                  {stats.brd}
                </div>
                <div style={{ color: '#666', fontSize: '13px' }}>BRD 文档</div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Filters */}
        <Card style={{ marginBottom: '24px' }}>
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <Input
              placeholder="搜索文档标题、描述或标签..."
              prefix={<SearchOutlined />}
              size="large"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
            <Space wrap>
              <Select
                placeholder="文档类型"
                style={{ width: 150 }}
                value={typeFilter}
                onChange={setTypeFilter}
              >
                <Select.Option value="all">全部类型</Select.Option>
                <Select.Option value="spec">Spec（规格）</Select.Option>
                <Select.Option value="brd">BRD（参考设计）</Select.Option>
                <Select.Option value="manual">开发手册</Select.Option>
                <Select.Option value="other">其他</Select.Option>
              </Select>
              <Select
                placeholder="关联产品"
                style={{ width: 180 }}
                value={productFilter}
                onChange={setProductFilter}
              >
                <Select.Option value="all">全部产品</Select.Option>
                <Select.Option value="OFS-ADCU-G3">OFS-ADCU-G3</Select.Option>
                <Select.Option value="OFS-COB-N">OFS-COB-N</Select.Option>
                <Select.Option value="通用文档">通用文档</Select.Option>
              </Select>
              <Select
                placeholder="权限级别"
                style={{ width: 150 }}
                value={permissionFilter}
                onChange={setPermissionFilter}
              >
                <Select.Option value="all">全部权限</Select.Option>
                <Select.Option value="public">公开</Select.Option>
                <Select.Option value="internal">内部</Select.Option>
                <Select.Option value="restricted">受限</Select.Option>
                <Select.Option value="confidential">机密</Select.Option>
              </Select>
            </Space>
          </Space>
        </Card>

        {/* Document List */}
        {filteredDocuments.length > 0 ? (
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 2,
              xxl: 3,
            }}
            dataSource={filteredDocuments}
            renderItem={(doc) => {
              const permissionInfo = getPermissionInfo(doc.permission)
              return (
                <List.Item>
                  <Badge.Ribbon
                    text={permissionInfo.text}
                    color={permissionInfo.color}
                  >
                    <Card
                      hoverable
                      actions={[
                        <Tooltip key="view" title="预览">
                          <Button type="text" icon={<EyeOutlined />} />
                        </Tooltip>,
                        <Tooltip key="download" title="下载">
                          <Button
                            type="text"
                            icon={<DownloadOutlined />}
                            onClick={() => handleDownload(doc)}
                          />
                        </Tooltip>,
                        <Text key="downloads" type="secondary" style={{ fontSize: '12px' }}>
                          {doc.downloads} 次下载
                        </Text>
                      ]}
                    >
                      <div style={{ display: 'flex', marginBottom: '12px' }}>
                        <div style={{ marginRight: '16px' }}>
                          {getFileIcon(doc.fileFormat)}
                        </div>
                        <div style={{ flex: 1 }}>
                          <Space direction="vertical" size={4} style={{ width: '100%' }}>
                            {getTypeTag(doc.type)}
                            <Text strong style={{ fontSize: '15px', display: 'block' }}>
                              {doc.title}
                            </Text>
                          </Space>
                        </div>
                      </div>

                      <Paragraph
                        ellipsis={{ rows: 2 }}
                        style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}
                      >
                        {doc.description}
                      </Paragraph>

                      <Divider style={{ margin: '12px 0' }} />

                      <Space direction="vertical" size={4} style={{ width: '100%', fontSize: '12px' }}>
                        <div>
                          <Text type="secondary">产品：</Text>
                          <Tag>{doc.productName}</Tag>
                          <Text type="secondary">版本：</Text>
                          <Tag>{doc.version}</Tag>
                        </div>
                        <div>
                          <Text type="secondary">大小：</Text>
                          <Text>{doc.fileSize}</Text>
                          <Divider type="vertical" />
                          <Text type="secondary">格式：</Text>
                          <Text>{doc.fileFormat.toUpperCase()}</Text>
                        </div>
                        <div>
                          <Text type="secondary">更新：</Text>
                          <Text>{doc.updatedAt}</Text>
                          <Divider type="vertical" />
                          <Text type="secondary">作者：</Text>
                          <Text>{doc.author}</Text>
                        </div>
                        <div>
                          <Space size={4} wrap>
                            {doc.tags.map(tag => (
                              <Tag key={tag}>{tag}</Tag>
                            ))}
                          </Space>
                        </div>
                      </Space>
                    </Card>
                  </Badge.Ribbon>
                </List.Item>
              )
            }}
          />
        ) : (
          <Card>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="未找到匹配的文档"
            >
              <Button type="primary" onClick={() => {
                setSearchText('')
                setTypeFilter('all')
                setProductFilter('all')
                setPermissionFilter('all')
              }}>
                清除筛选条件
              </Button>
            </Empty>
          </Card>
        )}

        {/* Permission Notice */}
        <Card style={{ marginTop: '24px', background: '#fafafa' }}>
          <Title level={5}>权限说明</Title>
          <Space direction="vertical" size="small">
            <div>
              <Space>
                <UnlockOutlined style={{ color: '#52c41a' }} />
                <Text strong>公开文档</Text>
                <Text type="secondary">- 所有人可访问和下载</Text>
              </Space>
            </div>
            <div>
              <Space>
                <TeamOutlined style={{ color: '#1890ff' }} />
                <Text strong>内部文档</Text>
                <Text type="secondary">- 仅限公司内部员工访问</Text>
              </Space>
            </div>
            <div>
              <Space>
                <LockOutlined style={{ color: '#faad14' }} />
                <Text strong>受限文档</Text>
                <Text type="secondary">- 需要特定角色权限（如 FO、RD）</Text>
              </Space>
            </div>
            <div>
              <Space>
                <LockOutlined style={{ color: '#ff4d4f' }} />
                <Text strong>机密文档</Text>
                <Text type="secondary">- 仅限授权人员访问</Text>
              </Space>
            </div>
          </Space>
          <Divider />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            如需访问受限或机密文档，请联系您的团队负责人或通过系统申请权限。
          </Text>
        </Card>
      </div>
    </div>
  )
}
