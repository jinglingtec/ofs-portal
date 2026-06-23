'use client'

import { Card, Row, Col, Statistic, Typography, Table, Tag, Progress, List } from 'antd'
import {
  AppstoreOutlined,
  DatabaseOutlined,
  FileTextOutlined,
  UserOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  EyeOutlined,
  DownloadOutlined
} from '@ant-design/icons'

const { Title, Text } = Typography

export default function AdminDashboardPage() {
  // 模拟数据
  const recentActivities = [
    { id: 1, action: '上传文档', user: '张三', item: 'OFS-ADCU-G3 Spec v2.3.1', time: '10 分钟前' },
    { id: 2, action: '创建产品', user: '李四', item: 'OFS-ADCU-G4', time: '1 小时前' },
    { id: 3, action: '更新传感器', user: '王五', item: '华依 8MP 摄像头', time: '2 小时前' },
    { id: 4, action: '发布 FAQ', user: '赵六', item: 'COB N 传感器适配问题', time: '3 小时前' },
    { id: 5, action: '审核文档', user: '孙七', item: 'BRD v2.3', time: '5 小时前' },
  ]

  const popularDocuments = [
    { title: 'OFS-ADCU-G3 Spec v2.3', downloads: 156, views: 892 },
    { title: 'COB N 平台技术白皮书', downloads: 456, views: 2345 },
    { title: '传感器适配开发指南', downloads: 198, views: 987 },
    { title: 'OFS-ADCU-G3 BRD', downloads: 45, views: 234 },
  ]

  const pendingTasks = [
    { id: 1, task: '审核待发布文档', count: 3, priority: 'high' },
    { id: 2, task: '处理权限申请', count: 5, priority: 'medium' },
    { id: 3, task: '更新产品版本', count: 2, priority: 'low' },
    { id: 4, task: '回复用户反馈', count: 8, priority: 'medium' },
  ]

  return (
    <div>
      <Title level={2} style={{ marginBottom: '24px' }}>仪表盘</Title>

      {/* Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="产品总数"
              value={12}
              prefix={<AppstoreOutlined />}
              suffix={
                <span style={{ fontSize: '14px', color: '#52c41a' }}>
                  <ArrowUpOutlined /> 2
                </span>
              }
            />
            <Text type="secondary" style={{ fontSize: '12px' }}>较上月增加 2 个</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="传感器总数"
              value={45}
              prefix={<DatabaseOutlined />}
              suffix={
                <span style={{ fontSize: '14px', color: '#52c41a' }}>
                  <ArrowUpOutlined /> 3
                </span>
              }
            />
            <Text type="secondary" style={{ fontSize: '12px' }}>较上月增加 3 个</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="文档总数"
              value={125}
              prefix={<FileTextOutlined />}
              suffix={
                <span style={{ fontSize: '14px', color: '#52c41a' }}>
                  <ArrowUpOutlined /> 8
                </span>
              }
            />
            <Text type="secondary" style={{ fontSize: '12px' }}>较上月增加 8 个</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="活跃用户"
              value={238}
              prefix={<UserOutlined />}
              suffix={
                <span style={{ fontSize: '14px', color: '#f5222d' }}>
                  <ArrowDownOutlined /> 5
                </span>
              }
            />
            <Text type="secondary" style={{ fontSize: '12px' }}>较上月减少 5 人</Text>
          </Card>
        </Col>
      </Row>

      {/* Second Row */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col xs={24} lg={12}>
          <Card title="热门文档" extra={<a>查看全部</a>}>
            <List
              dataSource={popularDocuments}
              renderItem={(item) => (
                <List.Item>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500, marginBottom: '4px' }}>{item.title}</div>
                    <div style={{ fontSize: '12px', color: '#999' }}>
                      <EyeOutlined /> {item.views} 次浏览
                      <span style={{ margin: '0 8px' }}>|</span>
                      <DownloadOutlined /> {item.downloads} 次下载
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="待办任务" extra={<a>查看全部</a>}>
            <List
              dataSource={pendingTasks}
              renderItem={(item) => (
                <List.Item>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 500 }}>{item.task}</span>
                      <Tag
                        color={
                          item.priority === 'high' ? 'red' :
                          item.priority === 'medium' ? 'orange' : 'default'
                        }
                      >
                        {item.priority === 'high' ? '高' : item.priority === 'medium' ? '中' : '低'}
                      </Tag>
                    </div>
                    <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
                      {item.count} 项待处理
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Third Row */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col xs={24} lg={16}>
          <Card title="最近活动">
            <List
              dataSource={recentActivities}
              renderItem={(item) => (
                <List.Item>
                  <div style={{ flex: 1 }}>
                    <div>
                      <Tag color="blue">{item.action}</Tag>
                      <Text strong>{item.user}</Text>
                      <Text type="secondary"> {item.action} </Text>
                      <Text>{item.item}</Text>
                    </div>
                    <Text type="secondary" style={{ fontSize: '12px' }}>{item.time}</Text>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="系统状态">
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Text>存储空间</Text>
                <Text>68%</Text>
              </div>
              <Progress percent={68} status="active" />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Text>数据库</Text>
                <Text>45%</Text>
              </div>
              <Progress percent={45} status="active" />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Text>API 调用</Text>
                <Text>82%</Text>
              </div>
              <Progress percent={82} status="active" strokeColor="#faad14" />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Text>缓存命中率</Text>
                <Text>94%</Text>
              </div>
              <Progress percent={94} status="active" strokeColor="#52c41a" />
            </div>
          </Card>
        </Col>
      </Row>

      {/* System Info */}
      <Card title="系统信息">
        <Row gutter={16}>
          <Col xs={24} sm={12} md={6}>
            <div style={{ textAlign: 'center', padding: '16px' }}>
              <Text type="secondary">服务器状态</Text>
              <div style={{ marginTop: '8px' }}>
                <Tag color="success">运行中</Tag>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div style={{ textAlign: 'center', padding: '16px' }}>
              <Text type="secondary">数据库状态</Text>
              <div style={{ marginTop: '8px' }}>
                <Tag color="success">正常</Tag>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div style={{ textAlign: 'center', padding: '16px' }}>
              <Text type="secondary">缓存状态</Text>
              <div style={{ marginTop: '8px' }}>
                <Tag color="success">正常</Tag>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div style={{ textAlign: 'center', padding: '16px' }}>
              <Text type="secondary">搜索引擎</Text>
              <div style={{ marginTop: '8px' }}>
                <Tag color="success">正常</Tag>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  )
}
