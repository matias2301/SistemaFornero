import { NavItem } from './navItem';;

export let menu: NavItem[] = [
  {
    displayName: 'Dashboard',
    iconName: 'dashboard',
    route: 'dashboard'
  },
  {
    displayName: 'Clients',
    iconName: 'group',
    route: 'clients',
    children: [
      {
        displayName: 'List Clients',
        iconName: 'list',
        route: 'clients/list-clients'
      },
      {
        displayName: 'Add Client',
        iconName: 'add',
        route: 'clients/manage-clients'
      }
    ]
  },
  {
    displayName: 'Providers',
    iconName: 'local_shipping',
    route: 'providers',
    children: [
      {
        displayName: 'List Providers',
        iconName: 'list',
        route: 'providers/list-providers'
      },
      {
        displayName: 'Add Provider',
        iconName: 'add',
        route: 'providers/manage-providers'
      }
    ]
  },
  {
    displayName: 'Products',
    iconName: 'shopping_cart',
    route: 'products',
    children: [
      {
        displayName: 'List Products',
        iconName: 'list',
        route: 'products/list-products'
      },
      {
        displayName: 'Add Product',
        iconName: 'add',
        route: 'products/manage-products'
      }
    ]
  },
  {
    displayName: 'Articles',
    iconName: 'directions_bike',
    route: 'articles',
    children: [
      {
        displayName: 'List Articles',
        iconName: 'list',
        route: 'articles/list-articles'
      },
      {
        displayName: 'Add Article',
        iconName: 'add',
        route: 'articles/manage-articles'
      }
    ]
  },
  {
    displayName: 'Repairs',
    iconName: 'build',
    route: 'repairs',
    children: [
      {
        displayName: 'List Repairs',
        iconName: 'list',
        route: 'repairs/list-repairs'
      },
      {
        displayName: 'Add Repair',
        iconName: 'add',
        route: 'repairs/manage-repairs'
      }
    ]
  },
  {
      displayName: 'Sign Out',
      iconName: 'exit_to_app'
  }
];
