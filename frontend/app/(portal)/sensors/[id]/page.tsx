'use client'

import { Card, Descriptions, Tag, Button, Space, Tabs, Table, Typography, Divider, Alert, Row, Col } from 'antd'
import { ArrowLeftOutlined, CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, CameraOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const { Title, Paragraph, Text } = Typography
const { TabPane } = Tabs

// 模拟传感器详情数据
const mockSensorDetail = {
  '1': {
    code: 'HY-CAM-8MP',
    name: '华依 8MP 摄像头',
    fullName: 'Huayi 8 Megapixel Automotive Camera',
    manufacturer: '华依科技',
    model: 'HY-8M-V2',
    category: 'Camera',
    description: '800 万像素高性能车载摄像头，支持 HDR 和夜视功能，适用于 ADAS 和自动驾驶系统',
    status: 'active',

    overview: {
      introduction: '华依 8MP 摄像头是专为汽车应用设计的高性能图像传感器。采用先进的 CMOS 技术，提供出色的图像质量和低光性能。该摄像头经过车规级认证，能够在极端环境下稳定工作。',
      keyFeatures: [
        '800 万像素（3840x2160）高分辨率',
        '支持 HDR（高动态范围）成像',
        '出色的低光性能，夜视功能',
        '120° 广角视野',
        'MIPI CSI-2 接口，4 lane',
        '车规级认证（AEC-Q100）',
        '工作温度范围：-40°C ~ +85°C',
        '支持实时 ISP 处理'
      ],
      applications: [
        '前视感知摄像头',
        '环视系统',
        '车内监控',
        'ADAS 辅助驾驶',
        '自动泊车系统'
      ]
    },

    specifications: {
      optical: {
        resolution: '3840 x 2160 (8MP)',
        framerate: '30fps @ Full Resolution',
        pixelSize: '2.0µm x 2.0µm',
        fov: '120° (Diagonal)',
        shutterType: 'Rolling Shutter',
        hdr: '支持 (120dB)',
      },
      interface: {
        type: 'MIPI CSI-2',
        lanes: '4 lanes',
        dataRate: '2.5 Gbps per lane',
        control: 'I2C (400kHz)',
      },
      electrical: {
        voltage: '3.3V (Analog), 1.8V (Digital)',
        power: '< 600mW (Typical)',
        current: '< 200mA @ 3.3V',
      },
      environmental: {
        operatingTemp: '-40°C ~ +85°C',
        storageTemp: '-40°C ~ +105°C',
        humidity: '5% ~ 95% RH (non-condensing)',
        vibration: 'AEC-Q100 Grade 2',
      },
      mechanical: {
        dimensions: '12mm x 12mm (Sensor)',
        package: 'CSP (Chip Scale Package)',
        mountType: 'Surface Mount',
      }
    },

    compatibleProducts: [
      {
        id: '1',
        product: 'OFS-ADCU-G3',
        productName: 'OFS-ADCU-G3 Plus',
        platform: 'COB N',
        status: 'supported',
        minVersion: 'v2.3+',
        validatedDate: '2024-03-10',
        notes: '完全支持，已通过所有测试'
      },
      {
        id: '2',
        product: 'OFS-ADCU-G2',
        productName: 'OFS-ADCU-G2 Standard',
        platform: 'COB',
        status: 'supported',
        minVersion: 'v1.2+',
        validatedDate: '2024-01-15',
        notes: '完全支持'
      },
      {
        id: '3',
        product: 'OFS-COB-N',
        productName: 'OFS-COB-N Platform',
        platform: 'COB N',
        status: 'supported',
        minVersion: 'v1.8+',
        validatedDate: '2024-03-08',
        notes: '完全支持'
      },
      {
        id: '4',
        product: 'OFS-ADCU-G1',
        productName: 'OFS-ADCU-G1 Legacy',
        platform: 'COB',
        status: 'deprecated',
        minVersion: 'v1.0',
        validatedDate: '2023-06-10',
        notes: '不再维护，建议升级产品'
      },
    ],

    integrationGuide: {
      hardwareConnection: [
        '1. 使用标准 MIPI CSI-2 接口连接到域控制器',
        '2. 确保供电电压稳定（3.3V ±5%）',
        '3. I2C 控制总线连接（地址：0x36）',
        '4. 做好 EMC 防护和屏蔽',
      ],
      softwareConfiguration: [
        '1. 加载驱动程序：modprobe huayi_8mp_camera',
        '2. 配置 ISP 参数：/etc/camera/huayi_8mp.conf',
        '3. 设置分辨率和帧率',
        '4. 校准和标定（使用标定工具）',
      ],
      calibration: '需要进行光学标定和畸变校正。建议使用 OFS 标定工具套件进行标定。',
      knownIssues: [
        '在极低温度（<-30°C）下启动时间可能延长',
        '强光直射可能导致局部过曝（建议使用遮光罩）',
      ]
    },

    relatedDocuments: [
      { id: '1', title: '华依 8MP 摄像头数据手册', type: 'datasheet', size: '2.1 MB' },
      { id: '2', title: '华依 8MP 集成指南', type: 'guide', size: '4.5 MB' },
      { id: '3', title: '华依 8MP 驱动程序包', type: 'driver', size: '12.3 MB' },
      { id: '4', title: '华依 8MP 标定工具', type: 'tool', size: '8.7 MB' },
    ],

    updateHistory: [
      { date: '2024-03-10', version: 'v2.3', changes: '优化 HDR 算法；改进低光性能' },
      { date: '2024-01-15', version: 'v2.2', changes: '修复时间同步问题' },
      { date: '2023-11-10', version: 'v2.1', changes: '首次发布 OFS 适配版本' },
    ]
  }
}

export default function SensorDetailPage() {
  const params = useParams()
  const sensorId = params.id as string
  const sensor = mockSensorDetail[sensorId as keyof typeof mockSensorDetail]

  if (!sensor) {
    return (
      <div style={{ padding: '60px 24px', textAlign: 'center' }}>
        <Title level={3}>传感器不存在</Title>
        <Link href="/sensors">
          <Button type="primary">返回传感器列表</Button>
        </Link>
      </div>
    )
  }

  const getStatusTag = (status: string) => {
    const statusMap: Record<string, { color: string; text: string; icon: any }> = {
      supported: { color: 'success', text: '已支持', icon: <CheckCircleOutlined /> },
      in_progress: { color: 'processing', text: '适配中', icon: <ClockCircleOutlined /> },
      not_supported: { color: 'default', text: '不支持', icon: <CloseCircleOutlined /> },
      deprecated: { color: 'warning', text: '已废弃', icon: <CloseCircleOutlined /> },
    }
    const config = statusMap[status] || statusMap.not_supported
    return <Tag color={config.color} icon={config.icon}>{config.text}</Tag>
  }

  const compatibilityColumns = [
    {
      title: '产品',
      dataIndex: 'productName',
      key: 'productName',
      render: (text: string, record: any) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{text}</div>
          <div style={{ fontSize: '12px', color: '#999' }}>
            <Tag size="small">{record.platform}</Tag>
          </div>
        </div>
      )
    },
    {
      title: '支持状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getStatusTag(status)
    },
    {
      title: '最低版本',
      dataIndex: 'minVersion',
      key: 'minVersion',
    },
    {
      title: '验证日期',
      dataIndex: 'validatedDate',
      key: 'validatedDate',
    },
    {
      title: '说明',
      dataIndex: 'notes',
      key: 'notes',
    },
  ]

  return (
    <div className="page-content" style={{ background: '#f0f2f5', padding: '24px' }}>
      <div className="container-custom">
        {/* Breadcrumb */}
        <div style={{ marginBottom: '16px' }}>
          <Link href="/sensors">
            <Button type="text" icon={<ArrowLeftOutlined />}>
              返回传感器列表
            </Button>
          </Link>
        </div>

        {/* Header */}
        <Card style={{ marginBottom: '24px' }}>
          <Row gutter={24}>
            <Col xs={24} md={4}>
              <div style={{ textAlign: 'center', padding: '16px' }}>
                <CameraOutlined style={{ fontSize: '64px', color: '#1890ff' }} />
              </div>
            </Col>
            <Col xs={24} md={20}>
              <Space size="middle" style={{ marginBottom: '12px' }}>
                <Tag color="success" style={{ fontSize: '14px' }}>已发布</Tag>
                <Tag color="blue">{sensor.category}</Tag>
                <Text type="secondary">{sensor.code}</Text>
              </Space>
              <Title level={2} style={{ marginBottom: '8px' }}>
                {sensor.name}
              </Title>
              <Paragraph style={{ fontSize: '16px', color: '#666', marginBottom: '12px' }}>
                {sensor.fullName}
              </Paragraph>
              <Space size="large" wrap>
                <Text><strong>型号：</strong>{sensor.model}</Text>
                <Text><strong>厂商：</strong>{sensor.manufacturer}</Text>
                <Text><strong>类型：</strong>{sensor.category}</Text>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Tabs */}
        <Card>
          <Tabs defaultActiveKey="overview" size="large">
            {/* 概述 */}
            <TabPane tab="产品概述" key="overview">
              <Title level={4}>产品简介</Title>
              <Paragraph style={{ fontSize: '15px', lineHeight: '1.8' }}>
                {sensor.overview.introduction}
              </Paragraph>

              <Divider />

              <Title level={4}>核心特性</Title>
              <ul style={{ fontSize: '15px', lineHeight: '1.8' }}>
                {sensor.overview.keyFeatures.map((feature, index) => (
                  <li key={index} style={{ marginBottom: '8px' }}>
                    <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Divider />

              <Title level={4}>应用场景</Title>
              <Space wrap size="large">
                {sensor.overview.applications.map((app, index) => (
                  <Tag key={index} color="blue" style={{ fontSize: '14px', padding: '4px 12px' }}>
                    {app}
                  </Tag>
                ))}
              </Space>
            </TabPane>

            {/* 技术规格 */}
            <TabPane tab="技术规格" key="specifications">
              <Title level={4}>光学参数</Title>
              <Descriptions bordered column={2} size="small" style={{ marginBottom: '24px' }}>
                <Descriptions.Item label="分辨率">{sensor.specifications.optical.resolution}</Descriptions.Item>
                <Descriptions.Item label="帧率">{sensor.specifications.optical.framerate}</Descriptions.Item>
                <Descriptions.Item label="像素尺寸">{sensor.specifications.optical.pixelSize}</Descriptions.Item>
                <Descriptions.Item label="视场角">{sensor.specifications.optical.fov}</Descriptions.Item>
                <Descriptions.Item label="快门类型">{sensor.specifications.optical.shutterType}</Descriptions.Item>
                <Descriptions.Item label="HDR">{sensor.specifications.optical.hdr}</Descriptions.Item>
              </Descriptions>

              <Title level={4}>接口参数</Title>
              <Descriptions bordered column={2} size="small" style={{ marginBottom: '24px' }}>
                <Descriptions.Item label="接口类型">{sensor.specifications.interface.type}</Descriptions.Item>
                <Descriptions.Item label="通道数">{sensor.specifications.interface.lanes}</Descriptions.Item>
                <Descriptions.Item label="数据速率">{sensor.specifications.interface.dataRate}</Descriptions.Item>
                <Descriptions.Item label="控制接口">{sensor.specifications.interface.control}</Descriptions.Item>
              </Descriptions>

              <Title level={4}>电气参数</Title>
              <Descriptions bordered column={2} size="small" style={{ marginBottom: '24px' }}>
                <Descriptions.Item label="供电电压">{sensor.specifications.electrical.voltage}</Descriptions.Item>
                <Descriptions.Item label="功耗">{sensor.specifications.electrical.power}</Descriptions.Item>
                <Descriptions.Item label="电流" span={2}>{sensor.specifications.electrical.current}</Descriptions.Item>
              </Descriptions>

              <Title level={4}>环境要求</Title>
              <Descriptions bordered column={2} size="small" style={{ marginBottom: '24px' }}>
                <Descriptions.Item label="工作温度">{sensor.specifications.environmental.operatingTemp}</Descriptions.Item>
                <Descriptions.Item label="存储温度">{sensor.specifications.environmental.storageTemp}</Descriptions.Item>
                <Descriptions.Item label="湿度">{sensor.specifications.environmental.humidity}</Descriptions.Item>
                <Descriptions.Item label="振动">{sensor.specifications.environmental.vibration}</Descriptions.Item>
              </Descriptions>

              <Title level={4}>机械参数</Title>
              <Descriptions bordered column={2} size="small">
                <Descriptions.Item label="尺寸">{sensor.specifications.mechanical.dimensions}</Descriptions.Item>
                <Descriptions.Item label="封装">{sensor.specifications.mechanical.package}</Descriptions.Item>
                <Descriptions.Item label="安装方式" span={2}>{sensor.specifications.mechanical.mountType}</Descriptions.Item>
              </Descriptions>
            </TabPane>

            {/* 兼容产品 */}
            <TabPane tab="兼容产品" key="compatibility">
              <Paragraph style={{ marginBottom: '16px' }}>
                以下列出了支持 {sensor.name} 的 OFS 产品及其适配状态。
              </Paragraph>
              <Table
                columns={compatibilityColumns}
                dataSource={sensor.compatibleProducts}
                rowKey="id"
                pagination={false}
              />
              <div style={{ marginTop: '16px' }}>
                <Link href="/compatibility">
                  <Button type="primary">查看完整兼容性矩阵</Button>
                </Link>
              </div>
            </TabPane>

            {/* 集成指南 */}
            <TabPane tab="集成指南" key="integration">
              <Alert
                message="重要提示"
                description="在集成传感器前，请确保已阅读产品 Spec 和 BRD（基础软件参考设计）文档。"
                type="info"
                showIcon
                style={{ marginBottom: '24px' }}
              />

              <Title level={4}>硬件连接</Title>
              <ol style={{ fontSize: '15px', lineHeight: '1.8' }}>
                {sensor.integrationGuide.hardwareConnection.map((step, index) => (
                  <li key={index} style={{ marginBottom: '8px' }}>{step}</li>
                ))}
              </ol>

              <Divider />

              <Title level={4}>软件配置</Title>
              <ol style={{ fontSize: '15px', lineHeight: '1.8' }}>
                {sensor.integrationGuide.softwareConfiguration.map((step, index) => (
                  <li key={index} style={{ marginBottom: '8px' }}>{step}</li>
                ))}
              </ol>

              <Divider />

              <Title level={4}>标定和校准</Title>
              <Paragraph style={{ fontSize: '15px', lineHeight: '1.8' }}>
                {sensor.integrationGuide.calibration}
              </Paragraph>

              <Divider />

              <Title level={4}>已知问题</Title>
              <ul style={{ fontSize: '15px', lineHeight: '1.8' }}>
                {sensor.integrationGuide.knownIssues.map((issue, index) => (
                  <li key={index} style={{ marginBottom: '8px', color: '#faad14' }}>{issue}</li>
                ))}
              </ul>
            </TabPane>

            {/* 相关文档 */}
            <TabPane tab="相关文档" key="documents">
              <Paragraph style={{ marginBottom: '16px' }}>
                以下文档提供了详细的技术信息和开发资源。
              </Paragraph>
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                {sensor.relatedDocuments.map((doc) => (
                  <Card key={doc.id} size="small" hoverable>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <Text strong>{doc.title}</Text>
                        <div style={{ marginTop: '4px' }}>
                          <Tag size="small">{doc.type}</Tag>
                          <Text type="secondary" style={{ fontSize: '12px' }}>{doc.size}</Text>
                        </div>
                      </div>
                      <Button type="primary">下载</Button>
                    </div>
                  </Card>
                ))}
              </Space>
            </TabPane>

            {/* 更新历史 */}
            <TabPane tab="更新历史" key="history">
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                {sensor.updateHistory.map((update, index) => (
                  <Card key={index} size="small">
                    <Space direction="vertical" size={4}>
                      <Space>
                        <Text strong>{update.version}</Text>
                        <Text type="secondary">{update.date}</Text>
                      </Space>
                      <Text>{update.changes}</Text>
                    </Space>
                  </Card>
                ))}
              </Space>
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
