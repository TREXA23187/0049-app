import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { ss } from '../../utils/storage';
import { routesNameMap } from '@/routes/menus';
import { useTranslation } from 'react-i18next';
import { HomeOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { type } from 'os-browserify';

const getOpenKeys = (string, collapsed) => {
    let newStr = '',
        newArr = [],
        arr = string.split('/').map(i => '/' + i);
    for (let i = 1; i < arr.length - 1; i++) {
        newStr += arr[i];
        newArr.push(newStr);
    }
    return collapsed ? [] : newArr;
};

const SideMenu = props => {
    const { t } = useTranslation();

    const [state, setstate] = useState({
        openKeys: [],
        selectedKeys: []
    });

    let { openKeys, selectedKeys } = state;
    let menuProps = props.collapsed ? {} : { openKeys };

    useEffect(() => {
        let { pathname } = props.location;
        setstate(prevState => {
            return {
                ...prevState,
                selectedKeys: [pathname],
                openKeys: getOpenKeys(pathname)
            };
        });
    }, [props]);

    const onOpenChange = openKeys => {
        setstate(prevState => {
            if (openKeys.length === 0 || openKeys.length === 1) {
                return { ...prevState, openKeys };
            }
            const latestOpenKey = openKeys[openKeys.length - 1];

            if (latestOpenKey.includes(openKeys[0])) {
                return { ...prevState, openKeys };
            } else {
                return { ...prevState, openKeys: [latestOpenKey] };
            }
        });
    };

    const renderMenuItem = ({ key, icon, label, children, type }) => {
        return {
            key,
            icon,
            label: (
                <Link to={key} replace>
                    {/* {icon} */}
                    <span>{label}</span>
                </Link>
            ),
            children,
            type
        };
    };

    const menuItems = props.menu.map(item => {
        return renderMenuItem({
            key: item.key,
            label: item.title,
            icon: item.icon,
            children: item.children,
            type: item.type
        });
    });

    return (
        <Menu
            mode='inline'
            theme='dark'
            {...menuProps}
            selectedKeys={selectedKeys}
            onClick={data => {
                const { key } = data;
                setstate(prevState => ({ ...prevState, selectedKeys: [key] }));
                const newTabList = ss.get('tabList').filter(item => item.key !== key);
                newTabList.unshift({ key, content: '', title: routesNameMap[key], closable: true });
                newTabList.forEach(item => (item.closable = true));
                props.updateTabs(newTabList[0].key, newTabList);
                ss.set('tabList', newTabList);
            }}
            style={{
                width: 256
            }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            onOpenChange={onOpenChange}
            items={props.menu ? menuItems : []}
        />
    );
};

SideMenu.propTypes = {
    menu: PropTypes.array.isRequired
};

export default withRouter(SideMenu);
