import { NavItem } from './navItem';;

export let menu: NavItem[] = [
  {
    displayName: 'Panel de informes',
    iconName: 'dashboard',
    route: 'dashboard'
  },
  {
    displayName: 'Clientes',
    iconName: 'group',
    route: 'clients',
    children: [
      {
        displayName: 'Listado de clientes',
        iconName: 'list',
        route: 'clients/list-clients'
      },
      {
        displayName: 'Agregar cliente',
        iconName: 'add',
        route: 'clients/manage-clients'
      }
    ]
  },
  {
    displayName: 'Provedores',
    iconName: 'local_shipping',
    route: 'providers',
    children: [
      {
        displayName: 'Listado de provedores',
        iconName: 'list',
        route: 'providers/list-providers'
      },
      {
        displayName: 'Agregar provedor',
        iconName: 'add',
        route: 'providers/manage-providers'
      }
    ]
  },
  {
    displayName: 'Productos',
    iconName: 'shopping_cart',
    route: 'products',
    children: [
      {
        displayName: 'Listado de productos',
        iconName: 'list',
        route: 'products/list-products'
      },
      {
        displayName: 'Agregar producto',
        iconName: 'add',
        route: 'products/manage-products'
      }
    ]
  },
  {
    displayName: 'Artículos',
    iconName: 'directions_bike',
    route: 'articles',
    children: [
      {
        displayName: 'Listado de artículos',
        iconName: 'list',
        route: 'articles/list-articles'
      },
      {
        displayName: 'Agregar artículo',
        iconName: 'add',
        route: 'articles/manage-articles'
      }
    ]
  },
  {
    displayName: 'Reparaciones',
    iconName: 'build',
    route: 'repairs',
    children: [
      {
        displayName: 'Listado de reparaciones',
        iconName: 'list',
        route: 'repairs/list-repairs'
      },
      {
        displayName: 'Agregar reparación',
        iconName: 'add',
        route: 'repairs/manage-repairs'
      }
    ]
  },
  {
      displayName: 'Cerrar sesión',
      iconName: 'exit_to_app'
  }
];
