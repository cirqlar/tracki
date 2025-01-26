/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const AboutLazyImport = createFileRoute('/about')()
const homeIndexLazyImport = createFileRoute('/(home)/')()

// Create/Update Routes

const AboutLazyRoute = AboutLazyImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

const homeIndexLazyRoute = homeIndexLazyImport
  .update({
    id: '/(home)/',
    path: '/',
    getParentRoute: () => rootRoute,
  } as any)
  .lazy(() => import('./routes/(home)/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/(home)/': {
      id: '/(home)/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof homeIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/about': typeof AboutLazyRoute
  '/': typeof homeIndexLazyRoute
}

export interface FileRoutesByTo {
  '/about': typeof AboutLazyRoute
  '/': typeof homeIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/about': typeof AboutLazyRoute
  '/(home)/': typeof homeIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/about' | '/'
  fileRoutesByTo: FileRoutesByTo
  to: '/about' | '/'
  id: '__root__' | '/about' | '/(home)/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AboutLazyRoute: typeof AboutLazyRoute
  homeIndexLazyRoute: typeof homeIndexLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  AboutLazyRoute: AboutLazyRoute,
  homeIndexLazyRoute: homeIndexLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/about",
        "/(home)/"
      ]
    },
    "/about": {
      "filePath": "about.lazy.tsx"
    },
    "/(home)/": {
      "filePath": "(home)/index.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
