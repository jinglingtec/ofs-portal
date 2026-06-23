'use client'

import { useState } from 'react'
import { Card, Row, Col, Input, Select, Tag, Button, Space, Typography } from 'antd'
import { SearchOutlined, AppstoreOutlined, UnorderedListOutlined, DownloadOutlined, EyeOutlined } from '@ant-design/icons'
import Link from 'next/link'

const { Title } = Typography

// 模拟产品数据
const mockProducts = [
  {
    id: '1',
    code: 'OFS-ADCU-G3',
    name: 'OFS-ADCU-G3 Plus',
    description: '高性能 ADCU（高级驾驶控制单元）平台，支持 L4 级别自动驾驶',
    status: 'active',
    platform: 'COB N',
    version: 'v2.3.1',
    sensors: 8,
    updatedAt: '2024-03-10'
  },
  {
    id: '2',
    code: 'OFS-ADCU-G2',
    name: 'OFS-ADCU-G2 Standard',
    description: '标准 ADCU 平台，适用于 L2-L3 级别自动驾驶',
    status: 'active',
    platform: 'COB',
    version: 'v1.5.3',
    sensors: 6,
    updatedAt: '2024-03-05'
  },
  {
    id: '3',
    code: 'OFS-COB-N',
    name: 'OFS-COB-N Platform',
    description: 'COB（板上芯片）新一代封装平台，支持高集成度设计',
    status: 'active',
    platform: 'COB N',
    version: 'v1.8.2',
    sensors: 12,
    updatedAt: '2024-03-08'
  },
  {
    id: '4',
    code: 'OFS-ADCU-G1',
    name: 'OFS-ADCU-G1 Legacy',
    description: '第一代 ADCU 平台（已废弃，建议升级到 G2 或 G3）',
    status: 'deprecated',
    platform: 'COB',
    version: 'v1.0.9',
    sensors: 4,
    updatedAt: '2023-12-15'
  },
]

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         product.code.toLowerCase().includes(searchText.toLowerCase())
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'deprecated':
        return 'warning'
      case 'developing':
        return 'processing'
      default:
        return 'default'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return '已发布'
      case 'deprecated':
        return '已废弃'
      case 'developing':
        return '开发中'
      default:
        return status
    }
  }

  return (
    <div className="page-content" style={{ background: '#f0f2f5', padding: '24px' }}>
      <div className="container-custom">
        {/* Page Header */}
        <div style={{ marginBottom: '24px' }}>
          <Title level={2}>产品中心</Title>
          <p style={{ color: '#666', marginTop: '8px' }}>
            浏览 OFS（Open Full Stack）主线产品，查看产品定义、架构图、技术规格（Spec）和 BRD（基础软件参考设计）
          </p>
        </div>

        {/* Filter Bar */}
        <Card style={{ marginBottom: '24px' }}>
          <Space style={{ width: '100%', justifyContent: 'space-between' }} wrap>
            <Space wrap>
              <Input
                placeholder="搜索产品名称或代号..."
                prefix={<SearchOutlined />}
                style={{ width: 300 }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
              />
              <Select
                placeholder="状态筛选"
                style={{ width: 150 }}
                value={statusFilter}
                onChange={setStatusFilter}
                options={[
                  { value: 'all', label: '全部状态' },
                  { value: 'active', label: '已发布' },
                  { value: 'deprecated', label: '已废弃' },
                  { value: 'developing', label: '开发中' },
                ]}
              />
            </Space>
            <Space>
              <Button
                type={viewMode === 'grid' ? 'primary' : 'default'}
                icon={<AppstoreOutlined />}
                onClick={() => setViewMode('grid')}
              />
              <Button
                type={viewMode === 'list' ? 'primary' : 'default'}
                icon={<UnorderedListOutlined />}
                onClick={() => setViewMode('list')}
              />
            </Space>
          </Space>
        </Card>

        {/* Product List */}
        {viewMode === 'grid' ? (
          <Row gutter={[16, 16]}>
            {filteredProducts.map((product) => (
              <Col key={product.id} xs={24} sm={12} lg={8}>
                <Card
                  hoverable
                  actions={[
                    <Link key="view" href={`/products/${product.id}`}>
                      <EyeOutlined /> 查看详情
                    </Link>,
                    <span key="download">
                      <DownloadOutlined /> 下载 Spec
                    </span>,
                  ]}
                >
                  <div style={{ marginBottom: '12px' }}>
                    <Tag color={getStatusColor(product.status)}>
                      {getStatusText(product.status)}
                    </Tag>
                    <Tag>{product.platform}</Tag>
                  </div>
                  <Title level={4} style={{ marginBottom: '8px' }}>
                    {product.name}
                  </Title>
                  <p style={{ color: '#666', fontSize: '13px', marginBottom: '16px' }}>
                    {product.description}
                  </p>
                  <div style={{ fontSize: '12px', color: '#999' }}>
                    <div>版本: {product.version}</div>
                    <div>支持传感器: {product.sensors} 款</div>
                    <div>更新时间: {product.updatedAt}</div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div>
            {filteredProducts.map((product) => (
              <Card key={product.id} style={{ marginBottom: '16px' }} hoverable>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: '12px' }}>
                      <Tag color={getStatusColor(product.status)}>
                        {getStatusText(product.status)}
                      </Tag>
                      <Tag>{product.platform}</Tag>
                      <span style={{ marginLeft: '12px', fontWeight: 'bold', fontSize: '16px' }}>
                        {product.name}
                      </span>
                    </div>
                    <p style={{ color: '#666', marginBottom: '12px' }}>
                      {product.description}
                    </p>
                    <Space size="large" style={{ fontSize: '13px', color: '#999' }}>
                      <span>版本: {product.version}</span>
                      <span>支持传感器: {product.sensors} 款</span>
                      <span>更新时间: {product.updatedAt}</span>
                    </Space>
                  </div>
                  <Space>
                    <Link href={`/products/${product.id}`}>
                      <Button type="primary" icon={<EyeOutlined />}>
                        查看详情
                      </Button>
                    </Link>
                    <Button icon={<DownloadOutlined />}>
                      下载 Spec
                    </Button>
                  </Space>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <Card style={{ textAlign: 'center', padding: '60px 0' }}>
            <AppstoreOutlined style={{ fontSize: '64px', color: '#ccc', marginBottom: '16px' }} />
            <Title level={4} style={{ color: '#999' }}>
              未找到匹配的产品
            </Title>
            <p style={{ color: '#999' }}>
              请尝试调整搜索条件或筛选器
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}
