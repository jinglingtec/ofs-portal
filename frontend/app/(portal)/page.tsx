'use client'

import { Row, Col, Typography, Button, Space } from 'antd'
import { AppstoreOutlined, DatabaseOutlined, FileTextOutlined, QuestionCircleOutlined, ArrowRightOutlined, RocketOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const { Title, Paragraph } = Typography

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div>
      {/* Hero Section - Modern Tech Style */}
      <div className="hero-section">
        <div className="hero-bg-gradient"></div>
        <div className="hero-content container-custom">
          <div className={`hero-text ${mounted ? 'fade-in' : ''}`}>
            <div className="hero-badge">
              <RocketOutlined /> OFS Platform
            </div>
            <Title level={1} className="hero-title">
              驱动未来出行
              <br />
              <span className="hero-gradient-text">智能驾驶全栈解决方案</span>
            </Title>
            <Paragraph className="hero-subtitle">
              OFS产品平台 · 官方产品与技术资料门户
            </Paragraph>
            <Paragraph className="hero-description">
              为自动驾驶系统提供完整的产品定义、传感器适配、技术规格与参考设计
            </Paragraph>
            <Space size="large" className="hero-actions">
              <Link href="/products">
                <Button type="primary" size="large" className="hero-btn-primary">
                  探索产品 <ArrowRightOutlined />
                </Button>
              </Link>
              <Link href="/documents">
                <Button size="large" className="hero-btn-secondary">
                  技术文档
                </Button>
              </Link>
            </Space>
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="hero-decoration"></div>
      </div>

      {/* Statistics Section - Modern Cards */}
      <div className="stats-section">
        <div className="container-custom">
          <Row gutter={[32, 32]}>
            <Col xs={24} sm={12} md={6}>
              <div className={`stat-card ${mounted ? 'slide-up delay-1' : ''}`}>
                <div className="stat-icon stat-icon-blue">
                  <AppstoreOutlined />
                </div>
                <div className="stat-value">12</div>
                <div className="stat-label">产品平台</div>
                <div className="stat-desc">覆盖主流域控方案</div>
              </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <div className={`stat-card ${mounted ? 'slide-up delay-2' : ''}`}>
                <div className="stat-icon stat-icon-green">
                  <DatabaseOutlined />
                </div>
                <div className="stat-value">45+</div>
                <div className="stat-label">传感器中心</div>
                <div className="stat-desc">适配多厂商传感器</div>
              </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <div className={`stat-card ${mounted ? 'slide-up delay-3' : ''}`}>
                <div className="stat-icon stat-icon-orange">
                  <FileTextOutlined />
                </div>
                <div className="stat-value">125+</div>
                <div className="stat-label">技术文档</div>
                <div className="stat-desc">Spec/BRD/参考设计</div>
              </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <div className={`stat-card ${mounted ? 'slide-up delay-4' : ''}`}>
                <div className="stat-icon stat-icon-purple">
                  <QuestionCircleOutlined />
                </div>
                <div className="stat-value">68+</div>
                <div className="stat-label">Case中心</div>
                <div className="stat-desc">案例与最佳实践</div>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* Quick Links Section - Modern Feature Cards */}
      <div className="features-section">
        <div className="container-custom">
          <div className="section-header">
            <Title level={2} className="section-title">核心能力</Title>
            <Paragraph className="section-subtitle">
              一站式智能驾驶产品资料管理平台
            </Paragraph>
          </div>
          <Row gutter={[32, 32]}>
            <Col xs={24} md={8}>
              <Link href="/products">
                <div className={`feature-card ${mounted ? 'fade-in-up delay-1' : ''}`}>
                  <div className="feature-icon-wrapper feature-blue">
                    <AppstoreOutlined className="feature-icon" />
                  </div>
                  <Title level={4} className="feature-title">产品中心</Title>
                  <Paragraph className="feature-desc">
                    完整的 OFS 产品线定义，涵盖 ADCU、COB、BRD 等全栈方案架构
                  </Paragraph>
                  <div className="feature-link">
                    查看产品 <ArrowRightOutlined />
                  </div>
                </div>
              </Link>
            </Col>
            <Col xs={24} md={8}>
              <Link href="/compatibility">
                <div className={`feature-card ${mounted ? 'fade-in-up delay-2' : ''}`}>
                  <div className="feature-icon-wrapper feature-green">
                    <DatabaseOutlined className="feature-icon" />
                  </div>
                  <Title level={4} className="feature-title">兼容性矩阵</Title>
                  <Paragraph className="feature-desc">
                    产品-传感器适配关系可视化，快速定位适配缺口与验证状态
                  </Paragraph>
                  <div className="feature-link">
                    查看矩阵 <ArrowRightOutlined />
                  </div>
                </div>
              </Link>
            </Col>
            <Col xs={24} md={8}>
              <Link href="/documents">
                <div className={`feature-card ${mounted ? 'fade-in-up delay-3' : ''}`}>
                  <div className="feature-icon-wrapper feature-orange">
                    <FileTextOutlined className="feature-icon" />
                  </div>
                  <Title level={4} className="feature-title">文档中心</Title>
                  <Paragraph className="feature-desc">
                    技术规格、参考设计、开发手册，权限管理，版本追踪
                  </Paragraph>
                  <div className="feature-link">
                    浏览文档 <ArrowRightOutlined />
                  </div>
                </div>
              </Link>
            </Col>
          </Row>
        </div>
      </div>

      {/* Recent Updates Section - Modern Timeline */}
      <div className="updates-section">
        <div className="container-custom">
          <div className="section-header">
            <Title level={2} className="section-title">最近更新</Title>
            <Paragraph className="section-subtitle">
              持续迭代，保持最新
            </Paragraph>
          </div>
          <Row gutter={[32, 32]}>
            <Col xs={24} md={12}>
              <div className="update-card">
                <div className="update-header">
                  <span className="update-category">产品更新</span>
                  <Link href="/products" className="update-more">查看全部 →</Link>
                </div>
                <div className="update-list">
                  <div className="update-item">
                    <div className="update-dot update-dot-blue"></div>
                    <div className="update-content">
                      <div className="update-title">OFS-ADCU-G3 Plus v2.3.1</div>
                      <div className="update-meta">2024-03-10 · 新增传感器支持</div>
                    </div>
                  </div>
                  <div className="update-item">
                    <div className="update-dot update-dot-green"></div>
                    <div className="update-content">
                      <div className="update-title">OFS-COB-N v1.8.2</div>
                      <div className="update-meta">2024-03-08 · 性能优化</div>
                    </div>
                  </div>
                  <div className="update-item">
                    <div className="update-dot update-dot-purple"></div>
                    <div className="update-content">
                      <div className="update-title">OFS-ADCU-G2 v1.5.3</div>
                      <div className="update-meta">2024-03-05 · Bug 修复</div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="update-card">
                <div className="update-header">
                  <span className="update-category">文档更新</span>
                  <Link href="/documents" className="update-more">查看全部 →</Link>
                </div>
                <div className="update-list">
                  <div className="update-item">
                    <div className="update-dot update-dot-orange"></div>
                    <div className="update-content">
                      <div className="update-title">OFS-ADCU-G3 Spec v2.3</div>
                      <div className="update-meta">2024-03-10 · 技术规格</div>
                    </div>
                  </div>
                  <div className="update-item">
                    <div className="update-dot update-dot-cyan"></div>
                    <div className="update-content">
                      <div className="update-title">COB N BRD v1.8</div>
                      <div className="update-meta">2024-02-28 · 参考设计</div>
                    </div>
                  </div>
                  <div className="update-item">
                    <div className="update-dot update-dot-pink"></div>
                    <div className="update-content">
                      <div className="update-title">传感器适配指南 v3.1</div>
                      <div className="update-meta">2024-02-25 · 开发手册</div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}
