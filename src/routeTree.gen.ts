/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AppRouteImport } from './routes/_app/route'
import { Route as indexIndexImport } from './routes/(index)/_index'
import { Route as AppAboutImport } from './routes/app_.about'
import { Route as AppAppImport } from './routes/_app/app'
import { Route as indexIndexIndexImport } from './routes/(index)/_index.index'
import { Route as AppAppNewImport } from './routes/_app/app_/new'
import { Route as AppAppThingIdImport } from './routes/_app/app_/$thingId'
import { Route as indexIndexAppBeginImport } from './routes/(index)/_index.app.begin'

// Create Virtual Routes

const indexImport = createFileRoute('/(index)')()

// Create/Update Routes

const indexRoute = indexImport.update({
  id: '/(index)',
  getParentRoute: () => rootRoute,
} as any)

const AppRouteRoute = AppRouteImport.update({
  id: '/_app',
  getParentRoute: () => rootRoute,
} as any)

const indexIndexRoute = indexIndexImport.update({
  id: '/_index',
  getParentRoute: () => indexRoute,
} as any)

const AppAboutRoute = AppAboutImport.update({
  id: '/app_/about',
  path: '/app/about',
  getParentRoute: () => rootRoute,
} as any)

const AppAppRoute = AppAppImport.update({
  id: '/app',
  path: '/app',
  getParentRoute: () => AppRouteRoute,
} as any)

const indexIndexIndexRoute = indexIndexIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => indexIndexRoute,
} as any)

const AppAppNewRoute = AppAppNewImport.update({
  id: '/app_/new',
  path: '/app/new',
  getParentRoute: () => AppRouteRoute,
} as any)

const AppAppThingIdRoute = AppAppThingIdImport.update({
  id: '/app_/$thingId',
  path: '/app/$thingId',
  getParentRoute: () => AppRouteRoute,
} as any)

const indexIndexAppBeginRoute = indexIndexAppBeginImport.update({
  id: '/app/begin',
  path: '/app/begin',
  getParentRoute: () => indexIndexRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_app': {
      id: '/_app'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AppRouteImport
      parentRoute: typeof rootRoute
    }
    '/(index)': {
      id: '/(index)'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof indexImport
      parentRoute: typeof rootRoute
    }
    '/(index)/_index': {
      id: '/(index)/_index'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof indexIndexImport
      parentRoute: typeof indexRoute
    }
    '/_app/app': {
      id: '/_app/app'
      path: '/app'
      fullPath: '/app'
      preLoaderRoute: typeof AppAppImport
      parentRoute: typeof AppRouteImport
    }
    '/app_/about': {
      id: '/app_/about'
      path: '/app/about'
      fullPath: '/app/about'
      preLoaderRoute: typeof AppAboutImport
      parentRoute: typeof rootRoute
    }
    '/_app/app_/$thingId': {
      id: '/_app/app_/$thingId'
      path: '/app/$thingId'
      fullPath: '/app/$thingId'
      preLoaderRoute: typeof AppAppThingIdImport
      parentRoute: typeof AppRouteImport
    }
    '/_app/app_/new': {
      id: '/_app/app_/new'
      path: '/app/new'
      fullPath: '/app/new'
      preLoaderRoute: typeof AppAppNewImport
      parentRoute: typeof AppRouteImport
    }
    '/(index)/_index/': {
      id: '/(index)/_index/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof indexIndexIndexImport
      parentRoute: typeof indexIndexImport
    }
    '/(index)/_index/app/begin': {
      id: '/(index)/_index/app/begin'
      path: '/app/begin'
      fullPath: '/app/begin'
      preLoaderRoute: typeof indexIndexAppBeginImport
      parentRoute: typeof indexIndexImport
    }
  }
}

// Create and export the route tree

interface AppRouteRouteChildren {
  AppAppRoute: typeof AppAppRoute
  AppAppThingIdRoute: typeof AppAppThingIdRoute
  AppAppNewRoute: typeof AppAppNewRoute
}

const AppRouteRouteChildren: AppRouteRouteChildren = {
  AppAppRoute: AppAppRoute,
  AppAppThingIdRoute: AppAppThingIdRoute,
  AppAppNewRoute: AppAppNewRoute,
}

const AppRouteRouteWithChildren = AppRouteRoute._addFileChildren(
  AppRouteRouteChildren,
)

interface indexIndexRouteChildren {
  indexIndexIndexRoute: typeof indexIndexIndexRoute
  indexIndexAppBeginRoute: typeof indexIndexAppBeginRoute
}

const indexIndexRouteChildren: indexIndexRouteChildren = {
  indexIndexIndexRoute: indexIndexIndexRoute,
  indexIndexAppBeginRoute: indexIndexAppBeginRoute,
}

const indexIndexRouteWithChildren = indexIndexRoute._addFileChildren(
  indexIndexRouteChildren,
)

interface indexRouteChildren {
  indexIndexRoute: typeof indexIndexRouteWithChildren
}

const indexRouteChildren: indexRouteChildren = {
  indexIndexRoute: indexIndexRouteWithChildren,
}

const indexRouteWithChildren = indexRoute._addFileChildren(indexRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof AppRouteRouteWithChildren
  '/': typeof indexIndexIndexRoute
  '/app': typeof AppAppRoute
  '/app/about': typeof AppAboutRoute
  '/app/$thingId': typeof AppAppThingIdRoute
  '/app/new': typeof AppAppNewRoute
  '/app/begin': typeof indexIndexAppBeginRoute
}

export interface FileRoutesByTo {
  '': typeof AppRouteRouteWithChildren
  '/app': typeof AppAppRoute
  '/app/about': typeof AppAboutRoute
  '/app/$thingId': typeof AppAppThingIdRoute
  '/app/new': typeof AppAppNewRoute
  '/': typeof indexIndexIndexRoute
  '/app/begin': typeof indexIndexAppBeginRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_app': typeof AppRouteRouteWithChildren
  '/(index)': typeof indexRouteWithChildren
  '/(index)/_index': typeof indexIndexRouteWithChildren
  '/_app/app': typeof AppAppRoute
  '/app_/about': typeof AppAboutRoute
  '/_app/app_/$thingId': typeof AppAppThingIdRoute
  '/_app/app_/new': typeof AppAppNewRoute
  '/(index)/_index/': typeof indexIndexIndexRoute
  '/(index)/_index/app/begin': typeof indexIndexAppBeginRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/'
    | '/app'
    | '/app/about'
    | '/app/$thingId'
    | '/app/new'
    | '/app/begin'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/app'
    | '/app/about'
    | '/app/$thingId'
    | '/app/new'
    | '/'
    | '/app/begin'
  id:
    | '__root__'
    | '/_app'
    | '/(index)'
    | '/(index)/_index'
    | '/_app/app'
    | '/app_/about'
    | '/_app/app_/$thingId'
    | '/_app/app_/new'
    | '/(index)/_index/'
    | '/(index)/_index/app/begin'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AppRouteRoute: typeof AppRouteRouteWithChildren
  indexRoute: typeof indexRouteWithChildren
  AppAboutRoute: typeof AppAboutRoute
}

const rootRouteChildren: RootRouteChildren = {
  AppRouteRoute: AppRouteRouteWithChildren,
  indexRoute: indexRouteWithChildren,
  AppAboutRoute: AppAboutRoute,
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
        "/_app",
        "/(index)",
        "/app_/about"
      ]
    },
    "/_app": {
      "filePath": "_app/route.tsx",
      "children": [
        "/_app/app",
        "/_app/app_/$thingId",
        "/_app/app_/new"
      ]
    },
    "/(index)": {
      "filePath": "(index)",
      "children": [
        "/(index)/_index"
      ]
    },
    "/(index)/_index": {
      "filePath": "(index)/_index.tsx",
      "parent": "/(index)",
      "children": [
        "/(index)/_index/",
        "/(index)/_index/app/begin"
      ]
    },
    "/_app/app": {
      "filePath": "_app/app.tsx",
      "parent": "/_app"
    },
    "/app_/about": {
      "filePath": "app_.about.tsx"
    },
    "/_app/app_/$thingId": {
      "filePath": "_app/app_/$thingId.tsx",
      "parent": "/_app"
    },
    "/_app/app_/new": {
      "filePath": "_app/app_/new.tsx",
      "parent": "/_app"
    },
    "/(index)/_index/": {
      "filePath": "(index)/_index.index.tsx",
      "parent": "/(index)/_index"
    },
    "/(index)/_index/app/begin": {
      "filePath": "(index)/_index.app.begin.tsx",
      "parent": "/(index)/_index"
    }
  }
}
ROUTE_MANIFEST_END */
