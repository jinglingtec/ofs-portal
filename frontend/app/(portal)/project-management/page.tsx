'use client'

import { useState } from 'react'
import { Card, Input, Table, Tag, Space, Typography, Button, Row, Col, Select, Progress, Badge, Tabs } from 'antd'
import { SearchOutlined, ProjectOutlined, PlusOutlined, CalendarOutlined, UserOutlined, CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

const { Title, Text, Paragraph } = Typography
const { Option } = Select

// 项目数据类型
interface Project {
  id: string
  name: string
  description: string
  status: 'planning' | 'in-progress' | 'testing' | 'completed' | 'on-hold'
  priority: 'high' | 'medium' | 'low'
  progress: number
  owner: string
  team: string[]
  startDate: string
  endDate: string
  product: string
  tags: string[]
}

// 模拟项目数据
const mockProjects: Project[] = [
  {
    id: 'PRJ-001',
    name: 'OFS-ADCU-G3 Plus v2.4 开发',
    description: '新增多传感器融合算法优化，提升L4级自动驾驶性能',
    status: 'in-progress',
    priority: 'high',
    progress: 65,
    owner: '张三',
    team: ['张三', '李四', '王五'],
    startDate: '2024-02-01',
    endDate: '2024-04-30',
    product: 'OFS-ADCU-G3',
    tags: ['算法优化', '传感器融合', 'L4']
  },
  {
    id: 'PRJ-002',
    name: 'COB N 华依传感器适配',
    description: '完成华依新一代传感器在COB N平台的适配和验证',
    status: 'testing',
    priority: 'high',
    progress: 85,
    owner: '李四',
    team: ['李四', '赵六'],
    startDate: '2024-01-15',
    endDate: '2024-03-20',
    product: 'OFS-COB-N',
    tags: ['传感器适配', '华依', '测试验证']
  },
  {
    id: 'PRJ-003',
    name: 'BRD 文档体系优化',
    description: '重构基础软件参考设计文档，提升可读性和维护性',
    status: 'in-progress',
    priority: 'medium',
    progress: 40,
    owner: '王五',
    team: ['王五', '赵六'],
    startDate: '2024-03-01',
    endDate: '2024-05-15',
    product: '通用',
    tags: ['文档', 'BRD', '重构']
  },
  {
    id: 'PRJ-004',
    name: 'OFS 平台安全加固',
    description: '提升平台安全性，完成安全审计和漏洞修复',
    status: 'planning',
    priority: 'high',
    progress: 15,
    owner: '赵六',
    team: ['赵六', '孙七'],
    startDate: '2024-03-10',
    endDate: '2024-06-30',
    product: '通用',
    tags: ['安全', '加固', '审计']
  },
  {
    id: 'PRJ-005',
    name: '多产品兼容性测试',
    description: '完成Q1季度所有产品与传感器的兼容性测试',
    status: 'completed',
    priority: 'medium',
    progress: 100,
    owner: '孙七',
    team: ['孙七', '周八'],
    startDate: '2024-01-01',
    endDate: '2024-03-15',
    product: '通用',
    tags: ['兼容性', '测试', 'Q1']
  },
  {
    id: 'PRJ-006',
    name: 'ADCU-G2 性能优化',
    description: '优化G2平台功耗和散热性能',
    status: 'on-hold',
    priority: 'low',
    progress: 30,
    owner: '周八',
    team: ['周八'],
    startDate: '2024-02-10',
    endDate: '2024-04-10',
    product: 'OFS-ADCU-G2',
    tags: ['性能优化', '功耗', '散热']
  }
]

const statusColors = {
  'planning': 'blue',
  'in-progress': 'processing',
  'testing': 'warning',
  'completed': 'success',
  'on-hold': 'default'
}

const statusLabels = {
  'planning': '规划中',
  'in-progress': '进行中',
  'testing': '测试中',
  'completed': '已完成',
  'on-hold': '暂停'
}

const priorityColors = {
  'high': 'red',
  'medium': 'orange',
  'low': 'green'
}

const priorityLabels = {
  'high': '高',
  'medium': '中',
  'low': '低'
}

export default function ProjectManagementPage() {
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')

  // 过滤项目
  const filteredProjects = mockProjects.filter(project => {
    const matchSearch = project.name.toLowerCase().includes(searchText.toLowerCase()) ||
                       project.description.toLowerCase().includes(searchText.toLowerCase()) ||
                       project.owner.toLowerCase().includes(searchText.toLowerCase())
    const matchStatus = statusFilter === 'all' || project.status === statusFilter
    const matchPriority = priorityFilter === 'all' || project.priority === priorityFilter
    return matchSearch && matchStatus && matchPriority
  })

  // 统计数据
  const stats = {
    total: mockProjects.length,
    inProgress: mockProjects.filter(p => p.status === 'in-progress').length,
    completed: mockProjects.filter(p => p.status === 'completed').length,
    onHold: mockProjects.filter(p => p.status === 'on-hold').length
  }

  // 表格列定义
  const columns: ColumnsType<Project> = [
    {
      title: '项目编号',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (id) => <Text strong>{id}</Text>
    },
    {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      render: (name, record) => (
        <div>
          <Text strong style={{ fontSize: '14px' }}>{name}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>{record.description}</Text>
        </div>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: keyof typeof statusColors) => (
        <Badge status={statusColors[status] as any} text={statusLabels[status]} />
      )
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      width: 80,
      render: (priority: keyof typeof priorityColors) => (
        <Tag color={priorityColors[priority]}>{priorityLabels[priority]}</Tag>
      )
    },
    {
      title: '进度',
      dataIndex: 'progress',
      key: 'progress',
      width: 150,
      render: (progress) => (
        <Progress percent={progress} size="small" />
      )
    },
    {
      title: '负责人',
      dataIndex: 'owner',
      key: 'owner',
      width: 100,
      render: (owner) => (
        <Space>
          <UserOutlined />
          <Text>{owner}</Text>
        </Space>
      )
    },
    {
      title: '关联产品',
      dataIndex: 'product',
      key: 'product',
      width: 150,
      render: (product) => <Tag>{product}</Tag>
    },
    {
      title: '时间周期',
      key: 'dates',
      width: 180,
      render: (_, record) => (
        <div>
          <div style={{ fontSize: '12px' }}>
            <CalendarOutlined /> {record.startDate}
          </div>
          <div style={{ fontSize: '12px', marginTop: '4px' }}>
            至 {record.endDate}
          </div>
        </div>
      )
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      width: 200,
      render: (tags) => (
        <>
          {tags.map((tag: string) => (
            <Tag key={tag} style={{ marginBottom: '4px' }}>{tag}</Tag>
          ))}
        </>
      )
    }
  ]

  return (
    <div style={{ background: '#f0f2f5', minHeight: 'calc(100vh - 134px)' }}>
      {/* Header */}
      <div style={{ background: '#fff', padding: '24px 50px', borderBottom: '1px solid #f0f0f0' }}>
        <Space direction="vertical" size={0} style={{ width: '100%' }}>
          <Title level={2} style={{ margin: 0 }}>
            <ProjectOutlined /> 项目管理中心
          </Title>
          <Paragraph type="secondary" style={{ margin: '8px 0 0 0' }}>
            管理和追踪 OFS 产品相关项目的进度和状态
          </Paragraph>
        </Space>
      </div>

      {/* Statistics */}
      <div style={{ padding: '24px 50px' }}>
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <Text type="secondary">项目总数</Text>
                  <Title level={2} style={{ margin: '8px 0 0 0' }}>{stats.total}</Title>
                </div>
                <ProjectOutlined style={{ fontSize: '40px', color: '#1890ff' }} />
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <Text type="secondary">进行中</Text>
                  <Title level={2} style={{ margin: '8px 0 0 0', color: '#1890ff' }}>{stats.inProgress}</Title>
                </div>
                <ClockCircleOutlined style={{ fontSize: '40px', color: '#1890ff' }} />
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <Text type="secondary">已完成</Text>
                  <Title level={2} style={{ margin: '8px 0 0 0', color: '#52c41a' }}>{stats.completed}</Title>
                </div>
                <CheckCircleOutlined style={{ fontSize: '40px', color: '#52c41a' }} />
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <Text type="secondary">已暂停</Text>
                  <Title level={2} style={{ margin: '8px 0 0 0', color: '#faad14' }}>{stats.onHold}</Title>
                </div>
                <ExclamationCircleOutlined style={{ fontSize: '40px', color: '#faad14' }} />
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Filters and Actions */}
      <div style={{ padding: '0 50px 24px' }}>
        <Card>
          <Space size="middle" style={{ width: '100%', justifyContent: 'space-between' }}>
            <Space size="middle">
              <Input
                placeholder="搜索项目名称、描述或负责人..."
                prefix={<SearchOutlined />}
                style={{ width: 300 }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
              />
              <Select
                style={{ width: 150 }}
                placeholder="项目状态"
                value={statusFilter}
                onChange={setStatusFilter}
              >
                <Option value="all">全部状态</Option>
                <Option value="planning">规划中</Option>
                <Option value="in-progress">进行中</Option>
                <Option value="testing">测试中</Option>
                <Option value="completed">已完成</Option>
                <Option value="on-hold">暂停</Option>
              </Select>
              <Select
                style={{ width: 150 }}
                placeholder="优先级"
                value={priorityFilter}
                onChange={setPriorityFilter}
              >
                <Option value="all">全部优先级</Option>
                <Option value="high">高</Option>
                <Option value="medium">中</Option>
                <Option value="low">低</Option>
              </Select>
            </Space>
            <Button type="primary" icon={<PlusOutlined />}>
              新建项目
            </Button>
          </Space>
        </Card>
      </div>

      {/* Projects Table */}
      <div style={{ padding: '0 50px 50px' }}>
        <Card>
          <Table
            columns={columns}
            dataSource={filteredProjects}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `共 ${total} 个项目`
            }}
          />
        </Card>
      </div>
    </div>
  )
}
