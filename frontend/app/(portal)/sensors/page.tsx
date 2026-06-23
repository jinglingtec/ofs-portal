'use client'

import { useState } from 'react'
import { Card, Row, Col, Input, Select, Tag, Button, Space, Typography, Badge } from 'antd'
import { SearchOutlined, AppstoreOutlined, UnorderedListOutlined, EyeOutlined, CameraOutlined, RadarChartOutlined } from '@ant-design/icons'
import Link from 'next/link'

const { Title } = Typography

// 模拟传感器数据
const mockSensors = [
  {
    id: '1',
    code: 'HY-CAM-8MP',
    name: '华依 8MP 摄像头',
    manufacturer: '华依科技',
    category: 'Camera',
    model: 'HY-8M-V2',
    description: '800 万像素高性能车载摄像头，支持 HDR 和夜视功能',
    status: 'active',
    supportedProducts: 5,
    resolution: '3840x2160@30fps',
    interface: 'MIPI CSI-2',
    fov: '120°',
    updatedAt: '2024-03-10'
  },
  {
    id: '2',
    code: 'CONTI-ARS548',
    name: '大陆 ARS548 毫米波雷达',
    manufacturer: '大陆集团',
    category: 'Radar',
    model: 'ARS548',
    description: '77GHz 长距离毫米波雷达，探测距离 300m',
    status: 'active',
    supportedProducts: 4,
    frequency: '77GHz',
    range: '0.15m ~ 300m',
    fov: '±60° (水平)',
    interface: 'CAN-FD',
    updatedAt: '2024-03-08'
  },
  {
    id: '3',
    code: 'RSL-M1',
    name: '速腾聚创 RS-LiDAR-M1',
    manufacturer: '速腾聚创',
    category: 'LiDAR',
    model: 'RS-LiDAR-M1',
    description: '智能固态激光雷达，适用于 ADAS 和自动驾驶',
    status: 'active',
    supportedProducts: 3,
    channels: '125 线',
    range: '150m @ 10% 反射率',
    fov: '120° x 25°',
    interface: 'Ethernet',
    updatedAt: '2024-03-05'
  },
  {
    id: '4',
    code: 'HESAI-AT128',
    name: '禾赛 AT128',
    manufacturer: '禾赛科技',
    category: 'LiDAR',
    model: 'AT128',
    description: '128 线超高分辨率激光雷达',
    status: 'beta',
    supportedProducts: 2,
    channels: '128 线',
    range: '200m @ 10% 反射率',
    fov: '120° x 25.4°',
    interface: 'Ethernet',
    updatedAt: '2024-03-01'
  },
  {
    id: '5',
    code: 'ON-AR0820',
    name: '安森美 AR0820',
    manufacturer: '安森美半导体',
    category: 'Camera',
    model: 'AR0820',
    description: '8.3MP CMOS 图像传感器，支持 LED 闪烁抑制',
    status: 'active',
    supportedProducts: 6,
    resolution: '3840x2160@30fps',
    interface: 'MIPI CSI-2',
    fov: '100°',
    updatedAt: '2024-02-28'
  },
  {
    id: '6',
    code: 'BOSCH-MRR',
    name: '博世 MRR',
    manufacturer: '博世',
    category: 'Radar',
    model: 'MRR-6',
    description: '中距离毫米波雷达，适用于侧向和后向检测',
    status: 'active',
    supportedProducts: 4,
    frequency: '77GHz',
    range: '0.3m ~ 80m',
    fov: '±45°',
    interface: 'CAN',
    updatedAt: '2024-02-25'
  },
]

export default function SensorsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchText, setSearchText] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [manufacturerFilter, setManufacturerFilter] = useState<string>('all')

  const filteredSensors = mockSensors.filter(sensor => {
    const matchesSearch = sensor.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         sensor.code.toLowerCase().includes(searchText.toLowerCase()) ||
                         sensor.manufacturer.toLowerCase().includes(searchText.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || sensor.category === categoryFilter
    const matchesManufacturer = manufacturerFilter === 'all' || sensor.manufacturer === manufacturerFilter
    return matchesSearch && matchesCategory && matchesManufacturer
  })

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, any> = {
      Camera: <CameraOutlined />,
      Radar: <RadarChartOutlined />,
      LiDAR: <RadarChartOutlined />,
    }
    return icons[category] || <AppstoreOutlined />
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Camera: 'blue',
      Radar: 'green',
      LiDAR: 'purple',
    }
    return colors[category] || 'default'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'beta':
        return 'processing'
      case 'deprecated':
        return 'warning'
      default:
        return 'default'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return '已发布'
      case 'beta':
        return '测试版'
      case 'deprecated':
        return '已废弃'
      default:
        return status
    }
  }

  const manufacturers = ['全部厂商', ...Array.from(new Set(mockSensors.map(s => s.manufacturer)))]

  return (
    <div className="page-content" style={{ background: '#f0f2f5', padding: '24px' }}>
      <div className="container-custom">
        {/* Page Header */}
        <div style={{ marginBottom: '24px' }}>
          <Title level={2}>传感器中心</Title>
          <p style={{ color: '#666', marginTop: '8px' }}>
            浏览 OFS 支持的主线传感器，包括摄像头、激光雷达、毫米波雷达等
          </p>
        </div>

        {/* Statistics Cards */}
        <Row gutter={16} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={8}>
            <Card>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1890ff' }}>
                  {mockSensors.length}
                </div>
                <div style={{ color: '#666', marginTop: '8px' }}>传感器总数</div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#52c41a' }}>
                  {mockSensors.filter(s => s.status === 'active').length}
                </div>
                <div style={{ color: '#666', marginTop: '8px' }}>已发布</div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#722ed1' }}>
                  {Array.from(new Set(mockSensors.map(s => s.manufacturer))).length}
                </div>
                <div style={{ color: '#666', marginTop: '8px' }}>合作厂商</div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Filter Bar */}
        <Card style={{ marginBottom: '24px' }}>
          <Space style={{ width: '100%', justifyContent: 'space-between' }} wrap>
            <Space wrap>
              <Input
                placeholder="搜索传感器名称、代号或厂商..."
                prefix={<SearchOutlined />}
                style={{ width: 300 }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
              />
              <Select
                placeholder="传感器类型"
                style={{ width: 150 }}
                value={categoryFilter}
                onChange={setCategoryFilter}
              >
                <Select.Option value="all">全部类型</Select.Option>
                <Select.Option value="Camera">摄像头</Select.Option>
                <Select.Option value="Radar">毫米波雷达</Select.Option>
                <Select.Option value="LiDAR">激光雷达</Select.Option>
              </Select>
              <Select
                placeholder="厂商筛选"
                style={{ width: 150 }}
                value={manufacturerFilter}
                onChange={setManufacturerFilter}
              >
                <Select.Option value="all">全部厂商</Select.Option>
                {manufacturers.slice(1).map(m => (
                  <Select.Option key={m} value={m}>{m}</Select.Option>
                ))}
              </Select>
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

        {/* Sensor List */}
        {viewMode === 'grid' ? (
          <Row gutter={[16, 16]}>
            {filteredSensors.map((sensor) => (
              <Col key={sensor.id} xs={24} sm={12} lg={8}>
                <Badge.Ribbon
                  text={getStatusText(sensor.status)}
                  color={getStatusColor(sensor.status) === 'success' ? 'green' : getStatusColor(sensor.status) === 'processing' ? 'blue' : 'orange'}
                >
                  <Card
                    hoverable
                    actions={[
                      <Link key="view" href={`/sensors/${sensor.id}`}>
                        <EyeOutlined /> 查看详情
                      </Link>,
                      <span key="compatibility">
                        兼容性矩阵
                      </span>,
                    ]}
                  >
                    <div style={{ marginBottom: '12px' }}>
                      <Space>
                        {getCategoryIcon(sensor.category)}
                        <Tag color={getCategoryColor(sensor.category)}>
                          {sensor.category}
                        </Tag>
                      </Space>
                    </div>
                    <Title level={4} style={{ marginBottom: '8px' }}>
                      {sensor.name}
                    </Title>
                    <p style={{ color: '#666', fontSize: '13px', marginBottom: '4px' }}>
                      <strong>型号：</strong>{sensor.model}
                    </p>
                    <p style={{ color: '#666', fontSize: '13px', marginBottom: '12px' }}>
                      <strong>厂商：</strong>{sensor.manufacturer}
                    </p>
                    <p style={{ color: '#666', fontSize: '13px', marginBottom: '16px', minHeight: '40px' }}>
                      {sensor.description}
                    </p>
                    <div style={{ fontSize: '12px', color: '#999' }}>
                      <div>支持产品: {sensor.supportedProducts} 款</div>
                      <div>更新时间: {sensor.updatedAt}</div>
                    </div>
                  </Card>
                </Badge.Ribbon>
              </Col>
            ))}
          </Row>
        ) : (
          <div>
            {filteredSensors.map((sensor) => (
              <Card key={sensor.id} style={{ marginBottom: '16px' }} hoverable>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: '12px' }}>
                      <Space>
                        {getCategoryIcon(sensor.category)}
                        <Tag color={getCategoryColor(sensor.category)}>
                          {sensor.category}
                        </Tag>
                        <Tag color={getStatusColor(sensor.status)}>
                          {getStatusText(sensor.status)}
                        </Tag>
                        <span style={{ marginLeft: '12px', fontWeight: 'bold', fontSize: '16px' }}>
                          {sensor.name}
                        </span>
                      </Space>
                    </div>
                    <p style={{ color: '#666', marginBottom: '12px' }}>
                      <strong>型号：</strong>{sensor.model} | <strong>厂商：</strong>{sensor.manufacturer}
                    </p>
                    <p style={{ color: '#666', marginBottom: '12px' }}>
                      {sensor.description}
                    </p>
                    <Space size="large" style={{ fontSize: '13px', color: '#999' }}>
                      <span>支持产品: {sensor.supportedProducts} 款</span>
                      <span>更新时间: {sensor.updatedAt}</span>
                    </Space>
                  </div>
                  <Space>
                    <Link href={`/sensors/${sensor.id}`}>
                      <Button type="primary" icon={<EyeOutlined />}>
                        查看详情
                      </Button>
                    </Link>
                  </Space>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredSensors.length === 0 && (
          <Card style={{ textAlign: 'center', padding: '60px 0' }}>
            <RadarChartOutlined style={{ fontSize: '64px', color: '#ccc', marginBottom: '16px' }} />
            <Title level={4} style={{ color: '#999' }}>
              未找到匹配的传感器
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
