'use client'

import { Layout, Menu, Input, Button, Avatar, Dropdown } from 'antd'
import { SearchOutlined, UserOutlined, BellOutlined, AppstoreOutlined, DatabaseOutlined, FileTextOutlined, QuestionCircleOutlined, ProjectOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { MenuProps } from 'antd'

const { Header, Content, Footer } = Layout

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const menuItems: MenuProps['items'] = [
    {
      key: '/',
      icon: <AppstoreOutlined />,
      label: <Link href="/">首页</Link>,
    },
    {
      key: '/products',
      icon: <AppstoreOutlined />,
      label: <Link href="/products">产品中心</Link>,
    },
    {
      key: '/sensors',
      icon: <DatabaseOutlined />,
      label: <Link href="/sensors">传感器生态</Link>,
    },
    {
      key: '/compatibility',
      icon: <DatabaseOutlined />,
      label: <Link href="/compatibility">兼容性矩阵</Link>,
    },
    {
      key: '/documents',
      icon: <FileTextOutlined />,
      label: <Link href="/documents">文档中心</Link>,
    },
    {
      key: '/faq',
      icon: <QuestionCircleOutlined />,
      label: <Link href="/faq">Case中心</Link>,
    },
    {
      key: '/project-management',
      icon: <ProjectOutlined />,
      label: <Link href="/project-management">项目管理中心</Link>,
    },
  ]

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: '个人中心',
    },
    {
      key: 'settings',
      label: '设置',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: '退出登录',
      danger: true,
    },
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        background: '#001529',
        padding: '0 50px'
      }}>
        <div style={{
          color: 'white',
          fontSize: '20px',
          fontWeight: 'bold',
          marginRight: '50px',
          whiteSpace: 'nowrap'
        }}>
          OFS产品平台
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[pathname]}
          items={menuItems}
          style={{ flex: 1, minWidth: 0 }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Input
            placeholder="搜索产品、文档..."
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
          />
          <Button type="text" icon={<BellOutlined style={{ fontSize: '18px', color: 'white' }} />} />
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
          </Dropdown>
        </div>
      </Header>

      <Content style={{ padding: '0', minHeight: 'calc(100vh - 134px)' }}>
        {children}
      </Content>

      <Footer style={{ textAlign: 'center', background: '#f0f2f5' }}>
        OFS产品平台 ©2024 Built with ❤️ for OFS Community
      </Footer>
    </Layout>
  )
}
