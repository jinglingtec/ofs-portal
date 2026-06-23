#!/bin/bash

# OFS Portal 自动部署脚本

set -e

echo "🚀 OFS Portal 部署工具"
echo "====================="
echo ""

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 检查是否已登录
check_railway_login() {
    if ! railway whoami &>/dev/null; then
        echo -e "${YELLOW}请先登录 Railway...${NC}"
        railway login
    else
        echo -e "${GREEN}✓ Railway 已登录${NC}"
    fi
}

check_vercel_login() {
    if ! vercel whoami &>/dev/null; then
        echo -e "${YELLOW}请先登录 Vercel...${NC}"
        vercel login
    else
        echo -e "${GREEN}✓ Vercel 已登录${NC}"
    fi
}

# 部署后端
deploy_backend() {
    echo ""
    echo -e "${YELLOW}📦 部署后端到 Railway...${NC}"
    cd backend

    # 检查是否已初始化 Railway 项目
    if [ ! -f "railway.toml" ] && [ ! -f ".railway" ]; then
        echo "初始化 Railway 项目..."
        railway init

        echo "添加 PostgreSQL 数据库..."
        railway add --plugin postgresql
    fi

    echo "设置环境变量..."
    railway variables set PORT=3001

    echo "部署后端..."
    railway up

    echo ""
    echo -e "${GREEN}✓ 后端部署完成！${NC}"
    echo "获取后端 URL..."
    BACKEND_URL=$(railway domain)
    echo -e "${GREEN}后端地址: $BACKEND_URL${NC}"

    cd ..
    echo "$BACKEND_URL" > .backend-url.tmp
}

# 部署前端
deploy_frontend() {
    echo ""
    echo -e "${YELLOW}🎨 部署前端到 Vercel...${NC}"
    cd frontend

    # 读取后端 URL
    if [ -f "../.backend-url.tmp" ]; then
        BACKEND_URL=$(cat ../.backend-url.tmp)
        echo "后端 URL: $BACKEND_URL"
    else
        echo -e "${YELLOW}请输入后端 Railway URL (如: https://xxx.railway.app):${NC}"
        read BACKEND_URL
    fi

    # 创建 .env.production
    echo "NEXT_PUBLIC_API_URL=$BACKEND_URL" > .env.production

    echo "部署前端..."
    vercel --prod

    echo ""
    echo -e "${GREEN}✓ 前端部署完成！${NC}"

    cd ..
}

# 更新后端 CORS
update_cors() {
    echo ""
    echo -e "${YELLOW}⚙️  更新后端 CORS 配置...${NC}"
    echo -e "${YELLOW}请输入前端 Vercel URL (如: https://xxx.vercel.app):${NC}"
    read FRONTEND_URL

    cd backend
    railway variables set CORS_ORIGIN="$FRONTEND_URL"
    echo -e "${GREEN}✓ CORS 配置已更新${NC}"
    cd ..
}

# 主菜单
show_menu() {
    echo ""
    echo "请选择部署选项："
    echo "1) 完整部署（后端 + 前端）"
    echo "2) 仅部署后端"
    echo "3) 仅部署前端"
    echo "4) 更新后端 CORS 配置"
    echo "5) 退出"
    echo ""
    read -p "选择 (1-5): " choice

    case $choice in
        1)
            check_railway_login
            check_vercel_login
            deploy_backend
            deploy_frontend
            update_cors
            echo ""
            echo -e "${GREEN}🎉 部署完成！${NC}"
            ;;
        2)
            check_railway_login
            deploy_backend
            ;;
        3)
            check_vercel_login
            deploy_frontend
            ;;
        4)
            check_railway_login
            update_cors
            ;;
        5)
            echo "退出"
            exit 0
            ;;
        *)
            echo -e "${RED}无效选择${NC}"
            show_menu
            ;;
    esac
}

# 清理临时文件
cleanup() {
    rm -f .backend-url.tmp
}

trap cleanup EXIT

# 运行主菜单
show_menu

echo ""
echo -e "${GREEN}✅ 所有操作已完成！${NC}"
echo ""
echo "📝 下一步："
echo "1. 访问你的前端 URL 测试应用"
echo "2. 如果需要自定义域名，请参考 DEPLOYMENT_GUIDE.md"
echo "3. 监控部署状态："
echo "   - Vercel: https://vercel.com/dashboard"
echo "   - Railway: https://railway.app/dashboard"
