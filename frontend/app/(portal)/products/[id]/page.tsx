'use client'

import { useState } from 'react'
import { Card, Descriptions, Tag, Button, Space, Tabs, Table, Timeline, Image, Typography, Divider, Alert } from 'antd'
import { DownloadOutlined, ShareAltOutlined, CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const { Title, Paragraph, Text } = Typography
const { TabPane } = Tabs

// 模拟产品详情数据
const mockProductDetail = {
  '1': {
    code: 'OFS-ADCU-G3',
    name: 'OFS-ADCU-G3 Plus',
    fullName: 'Open Full Stack Advanced Driver Control Unit Generation 3 Plus',
    description: '高性能 ADCU（高级驾驶控制单元）平台，支持 L4 级别自动驾驶',
    status: 'active',
    platform: 'COB N',
    version: 'v2.3.1',
    releaseDate: '2024-03-10',
    lifecycleStage: 'Production',

    overview: {
      definition: 'OFS-ADCU-G3 Plus 是新一代高性能自动驾驶域控制器平台，基于 COB N（板上芯片新一代）架构设计，支持 L4 级别自动驾驶功能。该平台集成了先进的传感器融合、实时计算和决策能力。',
      keyFeatures: [
        '支持 8 路摄像头 + 5 路毫米波雷达 + 2 路激光雷达输入',
        '算力高达 254 TOPS（INT8）',
        '支持多传感器时间同步，精度 < 1ms',
        '内置功能安全机制，符合 ASIL-D 标准',
        '支持 OTA 在线升级',
        '低功耗设计，TDP < 60W'
      ],
      targetScenarios: [
        '高速公路自动驾驶（HWP）',
        '城市领航辅助（NCA）',
        '自动泊车（AVP）',
        '智能召唤'
      ]
    },

    specifications: {
      processor: {
        cpu: 'ARM Cortex-A78AE @ 2.2GHz x 12',
        gpu: 'Mali-G78 @ 1.3GHz',
        npu: '双核 NPU，254 TOPS (INT8)',
        dsp: 'HiFi 5 DSP x 4'
      },
      memory: {
        ram: '32GB LPDDR5',
        storage: '128GB eMMC 5.1',
        cache: 'L1: 64KB/64KB, L2: 512KB, L3: 4MB'
      },
      interfaces: {
        camera: 'MIPI CSI-2, 8 lanes, 支持 8M@30fps x 8',
        can: 'CAN-FD x 6',
        ethernet: '1000BASE-T1 x 2, 100BASE-T1 x 4',
        usb: 'USB 3.0 x 2',
        pcie: 'PCIe Gen3 x4'
      },
      power: {
        voltage: '12V DC',
        tdp: '< 60W (typical), < 80W (max)',
        idlePower: '< 10W'
      },
      environmental: {
        operatingTemp: '-40°C ~ +85°C',
        storageTemp: '-40°C ~ +105°C',
        humidity: '5% ~ 95% (non-condensing)',
        vibration: '20G @ 20-2000Hz',
        emcCompliance: 'ISO 7637-2, ISO 11452-2'
      }
    },

    supportedSensors: [
      { id: '1', name: '华依 8MP 摄像头', type: 'Camera', status: 'supported', version: 'v2.3+' },
      { id: '2', name: '大陆 ARS548 毫米波雷达', type: 'Radar', status: 'supported', version: 'v2.0+' },
      { id: '3', name: '速腾聚创 RS-LiDAR-M1', type: 'LiDAR', status: 'supported', version: 'v2.3+' },
      { id: '4', name: '禾赛 AT128', type: 'LiDAR', status: 'in_progress', version: 'v2.4' },
      { id: '5', name: '安森美 AR0820', type: 'Camera', status: 'supported', version: 'v1.5+' },
      { id: '6', name: '博世 MRR', type: 'Radar', status: 'supported', version: 'v2.1+' },
    ],

    documents: [
      { id: '1', title: 'OFS-ADCU-G3 Product Specification v2.3', type: 'spec', size: '2.3 MB', date: '2024-03-10', permission: 'internal' },
      { id: '2', title: 'OFS-ADCU-G3 BRD v2.3', type: 'brd', size: '15.6 MB', date: '2024-03-10', permission: 'restricted' },
      { id: '3', title: 'OFS-ADCU-G3 Hardware Design Guide', type: 'manual', size: '8.2 MB', date: '2024-02-28', permission: 'internal' },
      { id: '4', title: 'OFS-ADCU-G3 Software Integration Guide', type: 'manual', size: '5.1 MB', date: '2024-03-01', permission: 'internal' },
      { id: '5', title: 'OFS-ADCU-G3 Architecture Diagram', type: 'other', size: '1.2 MB', date: '2024-03-05', permission: 'public' },
    ],

    versionHistory: [
      { version: 'v2.3.1', date: '2024-03-10', changes: '修复传感器时间同步问题；优化功耗控制', status: 'latest' },
      { version: 'v2.3.0', date: '2024-02-15', changes: '新增 AT128 激光雷达支持（Beta）；性能优化', status: 'stable' },
      { version: 'v2.2.0', date: '2024-01-20', changes: '新增 8MP 摄像头支持；增强功能安全机制', status: 'stable' },
      { version: 'v2.1.0', date: '2023-12-10', changes: '首次发布 G3 Plus 版本', status: 'stable' },
    ],

    relatedProducts: [
      { id: '2', code: 'OFS-ADCU-G2', name: 'OFS-ADCU-G2 Standard', relation: '前代产品' },
      { id: '3', code: 'OFS-COB-N', name: 'OFS-COB-N Platform', relation: '平台依赖' },
    ]
  }
}

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const product = mockProductDetail[productId as keyof typeof mockProductDetail]

  if (!product) {
    return (
      <div style={{ padding: '60px 24px', textAlign: 'center' }}>
        <Title level={3}>产品不存在</Title>
        <Link href="/products">
          <Button type="primary">返回产品列表</Button>
        </Link>
      </div>
    )
  }

  const getSensorStatusTag = (status: string) => {
    const statusMap: Record<string, { color: string; text: string; icon: any }> = {
      supported: { color: 'success', text: '已支持', icon: <CheckCircleOutlined /> },
      in_progress: { color: 'processing', text: '适配中', icon: <ClockCircleOutlined /> },
      not_supported: { color: 'default', text: '不支持', icon: <CloseCircleOutlined /> },
    }
    const config = statusMap[status] || statusMap.not_supported
    return <Tag color={config.color} icon={config.icon}>{config.text}</Tag>
  }

  const sensorColumns = [
    { title: '传感器名称', dataIndex: 'name', key: 'name' },
    { title: '类型', dataIndex: 'type', key: 'type' },
    {
      title: '支持状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getSensorStatusTag(status)
    },
    { title: '最低版本', dataIndex: 'version', key: 'version' },
  ]

  const documentColumns = [
    {
      title: '文档名称',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: any) => (
        <Space>
          {text}
          {record.permission === 'restricted' && <Tag color="orange">受限</Tag>}
          {record.permission === 'public' && <Tag color="green">公开</Tag>}
        </Space>
      )
    },
    { title: '类型', dataIndex: 'type', key: 'type', render: (type: string) => type.toUpperCase() },
    { title: '大小', dataIndex: 'size', key: 'size' },
    { title: '更新日期', dataIndex: 'date', key: 'date' },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Button type="link" icon={<DownloadOutlined />}>
          下载
        </Button>
      )
    },
  ]

  return (
    <div className="page-content" style={{ background: '#f0f2f5', padding: '24px' }}>
      <div className="container-custom">
        {/* Breadcrumb */}
        <div style={{ marginBottom: '16px' }}>
          <Link href="/products">
            <Button type="text" icon={<ArrowLeftOutlined />}>
              返回产品列表
            </Button>
          </Link>
        </div>

        {/* Header */}
        <Card style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <Space size="middle" style={{ marginBottom: '12px' }}>
                <Tag color="success" style={{ fontSize: '14px' }}>已发布</Tag>
                <Tag>{product.platform}</Tag>
                <Text type="secondary">{product.code}</Text>
              </Space>
              <Title level={2} style={{ marginBottom: '12px' }}>
                {product.name}
              </Title>
              <Paragraph style={{ fontSize: '16px', color: '#666', marginBottom: '16px' }}>
                {product.fullName}
              </Paragraph>
              <Space size="large">
                <Text><strong>当前版本：</strong>{product.version}</Text>
                <Text><strong>发布日期：</strong>{product.releaseDate}</Text>
                <Text><strong>生命周期：</strong>{product.lifecycleStage}</Text>
              </Space>
            </div>
            <Space direction="vertical">
              <Button type="primary" icon={<DownloadOutlined />} size="large">
                下载 Spec
              </Button>
              <Button icon={<ShareAltOutlined />} size="large">
                分享
              </Button>
            </Space>
          </div>
        </Card>

        {/* Tabs */}
        <Card>
          <Tabs defaultActiveKey="overview" size="large">
            {/* 概述 */}
            <TabPane tab="产品概述" key="overview">
              <Title level={4}>产品定义</Title>
              <Paragraph style={{ fontSize: '15px', lineHeight: '1.8' }}>
                {product.overview.definition}
              </Paragraph>

              <Divider />

              <Title level={4}>核心特性</Title>
              <ul style={{ fontSize: '15px', lineHeight: '1.8' }}>
                {product.overview.keyFeatures.map((feature, index) => (
                  <li key={index} style={{ marginBottom: '8px' }}>
                    <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Divider />

              <Title level={4}>目标应用场景</Title>
              <Space wrap size="large">
                {product.overview.targetScenarios.map((scenario, index) => (
                  <Tag key={index} color="blue" style={{ fontSize: '14px', padding: '4px 12px' }}>
                    {scenario}
                  </Tag>
                ))}
              </Space>

              <Divider />

              <Alert
                message="兼容性说明"
                description={`该产品基于 ${product.platform} 架构，支持 ${product.supportedSensors.length} 款主流传感器。详细兼容性信息请查看"支持的传感器"标签页。`}
                type="info"
                showIcon
              />
            </TabPane>

            {/* 技术规格 */}
            <TabPane tab="技术规格" key="specifications">
              <Title level={4}>处理器</Title>
              <Descriptions bordered column={2} size="small" style={{ marginBottom: '24px' }}>
                <Descriptions.Item label="CPU">{product.specifications.processor.cpu}</Descriptions.Item>
                <Descriptions.Item label="GPU">{product.specifications.processor.gpu}</Descriptions.Item>
                <Descriptions.Item label="NPU">{product.specifications.processor.npu}</Descriptions.Item>
                <Descriptions.Item label="DSP">{product.specifications.processor.dsp}</Descriptions.Item>
              </Descriptions>

              <Title level={4}>内存</Title>
              <Descriptions bordered column={2} size="small" style={{ marginBottom: '24px' }}>
                <Descriptions.Item label="RAM">{product.specifications.memory.ram}</Descriptions.Item>
                <Descriptions.Item label="存储">{product.specifications.memory.storage}</Descriptions.Item>
                <Descriptions.Item label="缓存" span={2}>{product.specifications.memory.cache}</Descriptions.Item>
              </Descriptions>

              <Title level={4}>接口</Title>
              <Descriptions bordered column={1} size="small" style={{ marginBottom: '24px' }}>
                <Descriptions.Item label="摄像头接口">{product.specifications.interfaces.camera}</Descriptions.Item>
                <Descriptions.Item label="CAN 总线">{product.specifications.interfaces.can}</Descriptions.Item>
                <Descriptions.Item label="以太网">{product.specifications.interfaces.ethernet}</Descriptions.Item>
                <Descriptions.Item label="USB">{product.specifications.interfaces.usb}</Descriptions.Item>
                <Descriptions.Item label="PCIe">{product.specifications.interfaces.pcie}</Descriptions.Item>
              </Descriptions>

              <Title level={4}>功耗</Title>
              <Descriptions bordered column={2} size="small" style={{ marginBottom: '24px' }}>
                <Descriptions.Item label="输入电压">{product.specifications.power.voltage}</Descriptions.Item>
                <Descriptions.Item label="TDP">{product.specifications.power.tdp}</Descriptions.Item>
                <Descriptions.Item label="待机功耗" span={2}>{product.specifications.power.idlePower}</Descriptions.Item>
              </Descriptions>

              <Title level={4}>环境要求</Title>
              <Descriptions bordered column={2} size="small">
                <Descriptions.Item label="工作温度">{product.specifications.environmental.operatingTemp}</Descriptions.Item>
                <Descriptions.Item label="存储温度">{product.specifications.environmental.storageTemp}</Descriptions.Item>
                <Descriptions.Item label="湿度">{product.specifications.environmental.humidity}</Descriptions.Item>
                <Descriptions.Item label="振动">{product.specifications.environmental.vibration}</Descriptions.Item>
                <Descriptions.Item label="EMC 合规" span={2}>{product.specifications.environmental.emcCompliance}</Descriptions.Item>
              </Descriptions>
            </TabPane>

            {/* 支持的传感器 */}
            <TabPane tab="支持的传感器" key="sensors">
              <Paragraph style={{ marginBottom: '16px' }}>
                以下列出了 {product.name} 当前支持的传感器列表。
              </Paragraph>
              <Table
                columns={sensorColumns}
                dataSource={product.supportedSensors}
                rowKey="id"
                pagination={false}
              />
              <div style={{ marginTop: '16px' }}>
                <Link href="/compatibility">
                  <Button type="primary">查看完整兼容性矩阵</Button>
                </Link>
              </div>
            </TabPane>

            {/* 相关文档 */}
            <TabPane tab="相关文档" key="documents">
              <Paragraph style={{ marginBottom: '16px' }}>
                以下文档提供了详细的技术信息和开发指南。部分文档可能需要特定权限才能下载。
              </Paragraph>
              <Table
                columns={documentColumns}
                dataSource={product.documents}
                rowKey="id"
                pagination={false}
              />
            </TabPane>

            {/* 版本历史 */}
            <TabPane tab="版本历史" key="versions">
              <Timeline>
                {product.versionHistory.map((version, index) => (
                  <Timeline.Item
                    key={index}
                    color={version.status === 'latest' ? 'green' : 'blue'}
                    dot={version.status === 'latest' ? <CheckCircleOutlined style={{ fontSize: '16px' }} /> : undefined}
                  >
                    <div style={{ paddingBottom: '16px' }}>
                      <Space>
                        <Text strong style={{ fontSize: '16px' }}>{version.version}</Text>
                        {version.status === 'latest' && <Tag color="green">最新版本</Tag>}
                        <Text type="secondary">{version.date}</Text>
                      </Space>
                      <div style={{ marginTop: '8px', color: '#666' }}>
                        {version.changes}
                      </div>
                    </div>
                  </Timeline.Item>
                ))}
              </Timeline>
            </TabPane>

            {/* 相关产品 */}
            <TabPane tab="相关产品" key="related">
              <div style={{ display: 'grid', gap: '16px' }}>
                {product.relatedProducts.map((relatedProduct) => (
                  <Card key={relatedProduct.id} size="small" hoverable>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <Text strong style={{ fontSize: '16px' }}>{relatedProduct.name}</Text>
                        <div style={{ marginTop: '4px' }}>
                          <Tag>{relatedProduct.code}</Tag>
                          <Tag color="blue">{relatedProduct.relation}</Tag>
                        </div>
                      </div>
                      <Link href={`/products/${relatedProduct.id}`}>
                        <Button>查看详情</Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
