---
date: 2015-04-24
categories:
  - 编程世界
tags:
  - GeoJSON
  - TopoJSON
  - JSON
---

# GeoJSON 和 TopoJSON

> GeoJSON 是用来描述一系列几何形状的数据结构。它可以描述以下几种几何类型：Point、LineString、Polygon、MultiPoint、MultiLineString 和 MultiPolygon。

> TopoJSON 是 GeoJSON 的拓展，用来描述拓扑结构。通过提取图形中公用的点来减少冗余，一般可以把 GeoJSON 的大小压缩到原来的 20%。

## GeoJSON

GeoJSON 使用 `type` 表示数据的类型。

当 `type` 取值 `Point`、`LineString`、`Polygon`、`MultiPoint`、`MultiLineString`、`MultiPolygon` 或 `GeometryCollection` 时，用来表示几何图。

当 `type` 取值 `Feature` 时，除了几何图外，还可以包含其他自定义信息。

当 `type` 取值 `FeatureCollection` 时，可以包含多个 Feature Objects。

GeoJSON 使用一维数组表示 `Point`，二维数组表示 `MultiPoint` 或 `LineString`（或 `LinearRing` 即环线），三维数组表示 `MultiLineString` 或 `Polygon`（包含洞的面），四维数组表示 `MultiPolygon`。

具体的规则，请直接看 [GeoJSON 规范]（最好阅读完了再继续往下看）。

## TopoJSON

TopoJSON 通过四种方式压缩了 GeoJSON 的大小。

### TopoJSON 的压缩算法

1. 把所有点提取到一个数组中，其他需要用到点的地方，都直接填入 index 即可。这样做的话，可以极大的减少数据的冗余，比如两个图形交界的地方只用存一份数据
2. 把浮点数转化为整型数，通过 transform 来转化
3. 点列表除了第一个点以外，其他的点都只存储相对位置
4. 通过 `topojson.simplify` 压缩（官方没有具体介绍）

通过前三种方式，即可使得大小能被压缩到原本的 20%。

### TopoJSON 的规范

具体的规范可以直接阅读 [TopoJSON 规范][]。

### TopoJSON API

官方只给出了 JavaScript 版本（另外有人实现了 python 版本），下面做个简单介绍。

#### Client API

- `topojson.feature`：从一个 `TopoJSON` 中获取指定的 `Feature` 或 `FeatureCollection`
- `topojson.merge`：把指定的面融合成一个面
- `topojson.mergeArcs`：和 `topojson.merge` 一样，不过返回一个 `TopoJSON MultiPolygon` 而不是 `GeoJSON`
- `topojson.mesh`：输入多个面，输出多条线，若两个面共用一条线，则只输出一次，用于防止边界被重复渲染
- `topojson.meshArcs`：和 `topojson.mesh` 一样，不过返回一个 `TopoJSON MultiLineString` 而不是 `GeoJSON`
- `topojson.neighbors`：对每个面找到与其相邻的面，可以用于四色问题
- `topojson.presimplify`：没有官方文档

#### Server API

- `topojson.topology`：把 `GeoJSON` 转换成 `TopoJSON`
- `topojson.simplify`：没有官方介绍
- `topojson.prune`：去掉没有用上的点
- `topojson.filter`：没有官方介绍
- `topojson.bind`：没有官方介绍

#### Command Line Tools

- 可以把 GeoJSON、SHP 或 CSV 转化为 TopoJSON

更多请阅读 [TopoJSON API Reference][] 和 [Command Line Reference][]。

## Links

- [GeoJSON 规范][]
- [TopoJSON 规范][]
- [TopoJSON API Reference][]
- [Command Line Reference][]

[GeoJSON 规范]: http://geojson.org/geojson-spec.html
[TopoJSON 规范]: https://github.com/topojson/topojson-specification/blob/master/README.md
[TopoJSON API Reference]: https://github.com/mbostock/topojson/wiki/API-Reference
[Command Line Reference]: https://github.com/mbostock/topojson/wiki/Command-Line-Reference
