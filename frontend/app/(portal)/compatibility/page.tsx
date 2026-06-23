'use client'

import { useState } from 'react'
import { Card, Table, Tag, Select, Space, Typography, Button, Tooltip, Tabs, Row, Col, Statistic } from 'antd'
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, DownloadOutlined, FilterOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

const { Title, Text } = Typography
const { TabPane } = Tabs

// 模拟兼容性数据
const mockCompatibilityData = [
  {
    key: '1',
    product: 'OFS-ADCU-G3',
    productName: 'OFS-ADCU-G3 Plus',
    platform: 'COB N',
    version: 'v2.3.1',
    sensors: {
      'HY-8MP': { status: 'supported', version: 'v2.3+', date: '2024-03-10', notes: '完全支持' },
      'ARS548': { status: 'supported', version: 'v2.0+', date: '2024-03-05', notes: '完全支持' },
      'RSL-M1': { status: 'supported', version: 'v2.3+', date: '2024-03-08', notes: '完全支持' },
      'AT128': { status: 'in_progress', version: 'v2.4', date: '-', notes: '测试中，预计 v2.4 发布' },
      'AR0820': { status: 'supported', version: 'v1.5+', date: '2024-02-15', notes: '完全支持' },
      'MRR': { status: 'supported', version: 'v2.1+', date: '2024-02-20', notes: '完全支持' },
    }
  },
  {
    key: '2',
    product: 'OFS-ADCU-G2',
    productName: 'OFS-ADCU-G2 Standard',
    platform: 'COB',
    version: 'v1.5.3',
    sensors: {
      'HY-8MP': { status: 'supported', version: 'v1.2+', date: '2024-01-15', notes: '完全支持' },
      'ARS548': { status: 'supported', version: 'v1.0+', date: '2023-12-20', notes: '完全支持' },
      'RSL-M1': { status: 'not_supported', version: '-', date: '-', notes: '硬件不支持' },
      'AT128': { status: 'not_supported', version: '-', date: '-', notes: '硬件不支持' },
      'AR0820': { status: 'supported', version: 'v1.0+', date: '2023-11-10', notes: '完全支持' },
      'MRR': { status: 'supported', version: 'v1.3+', date: '2024-01-05', notes: '完全支持' },
    }
  },
  {
    key: '3',
    product: 'OFS-COB-N',
    productName: 'OFS-COB-N Platform',
    platform: 'COB N',
    version: 'v1.8.2',
    sensors: {
      'HY-8MP': { status: 'supported', version: 'v1.8+', date: '2024-03-08', notes: '完全支持' },
      'ARS548': { status: 'supported', version: 'v1.5+', date: '2024-02-28', notes: '完全支持' },
      'RSL-M1': { status: 'supported', version: 'v1.8+', date: '2024-03-05', notes: '完全支持' },
      'AT128': { status: 'in_progress', version: 'v1.9', date: '-', notes: '适配中' },
      'AR0820': { status: 'supported', version: 'v1.6+', date: '2024-02-15', notes: '完全支持' },
      'MRR': { status: 'supported', version: 'v1.7+', date: '2024-02-25', notes: '完全支持' },
    }
  },
  {
    key: '4',
    product: 'OFS-ADCU-G1',
    productName: 'OFS-ADCU-G1 Legacy',
    platform: 'COB',
    version: 'v1.0.9',
    sensors: {
      'HY-8MP': { status: 'deprecated', version: 'v1.0', date: '2023-06-10', notes: '不再维护' },
      'ARS548': { status: 'deprecated', version: 'v1.0', date: '2023-05-15', notes: '不再维护' },
      'RSL-M1': { status: 'not_supported', version: '-', date: '-', notes: '不支持' },
      'AT128': { status: 'not_supported', version: '-', date: '-', notes: '不支持' },
      'AR0820': { status: 'deprecated', version: 'v1.0', date: '2023-04-20', notes: '不再维护' },
      'MRR': { status: 'deprecated', version: 'v1.0', date: '2023-05-25', notes: '不再维护' },
    }
  },
]

const sensorList = [
  { code: 'HY-8MP', name: '华依 8MP 摄像头', category: 'Camera' },
  { code: 'ARS548', name: '大陆 ARS548', category: 'Radar' },
  { code: 'RSL-M1', name: '速腾 RS-LiDAR-M1', category: 'LiDAR' },
  { code: 'AT128', name: '禾赛 AT128', category: 'LiDAR' },
  { code: 'AR0820', name: '安森美 AR0820', category: 'Camera' },
  { code: 'MRR', name: '博世 MRR', category: 'Radar' },
]

export default function CompatibilityPage() {
  const [productFilter, setProductFilter] = useState<string>('all')
  const [platformFilter, setPlatformFilter] = useState<string>('all')

  const getStatusTag = (status: string) => {
    const statusConfig: Record<string, { color: string; text: string; icon: any }> = {
      supported: { color: 'success', text: '已支持', icon: <CheckCircleOutlined /> },
      in_progress: { color: 'processing', text: '适配中', icon: <ClockCircleOutlined /> },
      not_supported: { color: 'default', text: '不支持', icon: <CloseCircleOutlined /> },
      deprecated: { color: 'warning', text: '已废弃', icon: <CloseCircleOutlined /> },
    }
    const config = statusConfig[status] || statusConfig.not_supported
    return <Tag color={config.color} icon={config.icon}>{config.text}</Tag>
  }

  const renderCompatibilityCell = (sensorCode: string, record: any) => {
    const sensorData = record.sensors[sensorCode]
    if (!sensorData) return '-'

    return (
      <Tooltip title={
        <div>
          <div><strong>状态：</strong>{sensorData.notes}</div>
          <div><strong>最低版本：</strong>{sensorData.version}</div>
          <div><strong>验证日期：</strong>{sensorData.date}</div>
        </div>
      }>
        <div style={{ cursor: 'pointer' }}>
          {getStatusTag(sensorData.status)}
        </div>
      </Tooltip>
    )
  }

  const columns: ColumnsType<any> = [
    {
      title: '产品',
      dataIndex: 'productName',
      key: 'productName',
      fixed: 'left',
      width: 200,
      render: (text: string, record: any) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{text}</div>
          <div style={{ fontSize: '12px', color: '#999' }}>
            <Tag style={{ fontSize: '11px' }}>{record.platform}</Tag>
            <span>{record.version}</span>
          </div>
        </div>
      )
    },
    ...sensorList.map(sensor => ({
      title: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{sensor.name}</div>
          <Tag style={{ marginTop: '4px' }}>{sensor.category}</Tag>
        </div>
      ),
      dataIndex: sensor.code,
      key: sensor.code,
      width: 130,
      align: 'center' as const,
      render: (_: any, record: any) => renderCompatibilityCell(sensor.code, record)
    }))
  ]

  const filteredData = mockCompatibilityData.filter(item => {
    const matchesProduct = productFilter === 'all' || item.product === productFilter
    const matchesPlatform = platformFilter === 'all' || item.platform === platformFilter
    return matchesProduct && matchesPlatform
  })

  // 计算统计数据
  const totalCompatibilities = filteredData.reduce((sum, product) => {
    return sum + Object.values(product.sensors).filter((s: any) => s.status === 'supported').length
  }, 0)

  const inProgressCount = filteredData.reduce((sum, product) => {
    return sum + Object.values(product.sensors).filter((s: any) => s.status === 'in_progress').length
  }, 0)

  const notSupportedCount = filteredData.reduce((sum, product) => {
    return sum + Object.values(product.sensors).filter((s: any) => s.status === 'not_supported').length
  }, 0)

  return (
    <div className="page-content" style={{ background: '#f0f2f5', padding: '24px' }}>
      <div className="container-custom">
        {/* Page Header */}
        <div style={{ marginBottom: '24px' }}>
          <Title level={2}>兼容性矩阵</Title>
          <p style={{ color: '#666', marginTop: '8px' }}>
            查看 OFS 产品与传感器的兼容性关系，快速定位适配状态和版本要求
          </p>
        </div>

        {/* Statistics */}
        <Row gutter={16} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={6}>
            <Card>
              <Statistic
                title="已支持"
                value={totalCompatibilities}
                valueStyle={{ color: '#3f8600' }}
                prefix={<CheckCircleOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card>
              <Statistic
                title="适配中"
                value={inProgressCount}
                valueStyle={{ color: '#1890ff' }}
                prefix={<ClockCircleOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card>
              <Statistic
                title="不支持"
                value={notSupportedCount}
                valueStyle={{ color: '#999' }}
                prefix={<CloseCircleOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card>
              <Statistic
                title="覆盖率"
                value={(totalCompatibilities / (filteredData.length * sensorList.length) * 100).toFixed(1)}
                suffix="%"
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>

        <Card>
          <Tabs defaultActiveKey="matrix">
            {/* 矩阵视图 */}
            <TabPane tab="矩阵视图" key="matrix">
              {/* Filters */}
              <Space style={{ marginBottom: '16px' }} wrap>
                <Text strong><FilterOutlined /> 筛选条件：</Text>
                <Select
                  style={{ width: 200 }}
                  value={productFilter}
                  onChange={setProductFilter}
                  placeholder="选择产品"
                >
                  <Select.Option value="all">全部产品</Select.Option>
                  {mockCompatibilityData.map(p => (
                    <Select.Option key={p.product} value={p.product}>{p.productName}</Select.Option>
                  ))}
                </Select>
                <Select
                  style={{ width: 150 }}
                  value={platformFilter}
                  onChange={setPlatformFilter}
                  placeholder="选择平台"
                >
                  <Select.Option value="all">全部平台</Select.Option>
                  <Select.Option value="COB N">COB N</Select.Option>
                  <Select.Option value="COB">COB</Select.Option>
                </Select>
                <Button icon={<DownloadOutlined />}>导出 Excel</Button>
              </Space>

              {/* Matrix Table */}
              <Table
                columns={columns}
                dataSource={filteredData}
                pagination={false}
                scroll={{ x: 1200 }}
                bordered
              />

              {/* Legend */}
              <div style={{ marginTop: '24px', padding: '16px', background: '#fafafa', borderRadius: '4px' }}>
                <Text strong style={{ marginRight: '16px' }}>图例：</Text>
                <Space size="large" wrap>
                  <Space>
                    <CheckCircleOutlined style={{ color: '#52c41a' }} />
                    <Text>已支持 - 已完成适配和验证</Text>
                  </Space>
                  <Space>
                    <ClockCircleOutlined style={{ color: '#1890ff' }} />
                    <Text>适配中 - 正在进行适配工作</Text>
                  </Space>
                  <Space>
                    <CloseCircleOutlined style={{ color: '#999' }} />
                    <Text>不支持 - 当前不支持或硬件限制</Text>
                  </Space>
                  <Space>
                    <CloseCircleOutlined style={{ color: '#faad14' }} />
                    <Text>已废弃 - 不再维护</Text>
                  </Space>
                </Space>
              </div>
            </TabPane>

            {/* 详细列表 */}
            <TabPane tab="详细列表" key="list">
              <div style={{ marginBottom: '16px' }}>
                <Text type="secondary">
                  以下列表提供了每个产品与传感器组合的详细适配信息，包括最低版本要求和验证日期。
                </Text>
              </div>

              {filteredData.map(product => (
                <Card
                  key={product.key}
                  title={
                    <div>
                      <Text strong>{product.productName}</Text>
                      <Tag style={{ marginLeft: '8px' }}>{product.platform}</Tag>
                      <Tag>{product.version}</Tag>
                    </div>
                  }
                  style={{ marginBottom: '16px' }}
                  size="small"
                >
                  <Row gutter={[16, 16]}>
                    {sensorList.map(sensor => {
                      const sensorData = product.sensors[sensor.code as keyof typeof product.sensors]
                      return (
                        <Col key={sensor.code} xs={24} md={12} lg={8}>
                          <Card type="inner" size="small">
                            <div style={{ marginBottom: '8px' }}>
                              <Text strong>{sensor.name}</Text>
                              <Tag style={{ marginLeft: '8px' }}>{sensor.category}</Tag>
                            </div>
                            <div style={{ fontSize: '13px' }}>
                              <div style={{ marginBottom: '4px' }}>
                                <Text type="secondary">状态：</Text>
                                {getStatusTag(sensorData.status)}
                              </div>
                              <div style={{ marginBottom: '4px' }}>
                                <Text type="secondary">最低版本：</Text>
                                <Text>{sensorData.version}</Text>
                              </div>
                              <div style={{ marginBottom: '4px' }}>
                                <Text type="secondary">验证日期：</Text>
                                <Text>{sensorData.date}</Text>
                              </div>
                              <div>
                                <Text type="secondary">说明：</Text>
                                <Text>{sensorData.notes}</Text>
                              </div>
                            </div>
                          </Card>
                        </Col>
                      )
                    })}
                  </Row>
                </Card>
              ))}
            </TabPane>

            {/* 适配计划 */}
            <TabPane tab="适配计划" key="roadmap">
              <Card>
                <Title level={4}>近期适配计划</Title>
                <div style={{ marginTop: '16px' }}>
                  <div style={{ marginBottom: '16px', padding: '12px', background: '#e6f7ff', borderLeft: '3px solid #1890ff' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                      OFS-ADCU-G3 v2.4（计划 2024-04）
                    </div>
                    <ul style={{ marginLeft: '20px', marginBottom: 0 }}>
                      <li>完成禾赛 AT128 激光雷达适配</li>
                      <li>优化传感器时间同步精度</li>
                    </ul>
                  </div>

                  <div style={{ marginBottom: '16px', padding: '12px', background: '#f6ffed', borderLeft: '3px solid #52c41a' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                      OFS-COB-N v1.9（计划 2024-05）
                    </div>
                    <ul style={{ marginLeft: '20px', marginBottom: 0 }}>
                      <li>完成禾赛 AT128 激光雷达平台级支持</li>
                      <li>新增更多 8MP 摄像头型号支持</li>
                    </ul>
                  </div>

                  <div style={{ padding: '12px', background: '#fff7e6', borderLeft: '3px solid #faad14' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                      后续版本规划
                    </div>
                    <ul style={{ marginLeft: '20px', marginBottom: 0 }}>
                      <li>扩展 4D 成像雷达支持</li>
                      <li>增加更多国产传感器适配</li>
                      <li>优化多传感器融合性能</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
