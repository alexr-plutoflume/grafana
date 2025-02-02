+++
title = "What's new in Grafana v8.0"
description = "Feature and improvement highlights for Grafana v8.0"
keywords = ["grafana", "new", "documentation", "8.0", "release notes"]
weight = -33
aliases = ["/docs/grafana/latest/guides/whats-new-in-v8-0/"]
[_build]
list = false
+++

# What’s new in Grafana v8.0

> **Note:** This topic will be updated frequently between now and the final release.

This topic includes the release notes for Grafana v8.0. For all details, read the full [CHANGELOG.md](https://github.com/grafana/grafana/blob/master/CHANGELOG.md).

## Grafana OSS features

These features are included in the Grafana open source edition.

### Library panels

Library panels allow users to build panels that can be used in multiple dashboards. Any updates made to that shared panel will then automatically be applied to all the dashboards that have that panel.

### Timeline panel

Shows discrete status or state transitions of something over time. For example daily uptime or multi-sensor and digital I/O status.

### Bar chart panel

New visualization that allows categorical data display. Following the new panel architecture supports field config and overrides, common tooltip, and legend options.

### Time series panel updates

The Time series is out of beta!  We are removing the `Beta`tag and graduating the Time series panel to a stable state.
- **Time series** is now the default visualization option, replacing the **Graph (old)**.
- The Time series panel now supports stacking. For more information, refer to [Graph stacked time series]({{< relref "../panels/visualizations/time-series/graph-time-series-stacking.md" >}}).
- We added support for a shared crosshair and a tooltip that’s now smarter when it comes to data display in the tooltip.
- Various performance improvements.

### Panel editor updates

- All options are now shown in a single pane.
- You can now search panel options.
- Value mapping has been completely redesigned.

### Look and feel update

Grafana 8 comes with a refreshed look and feel, including themes changed to be more accessible. The improved Grafana UI brings a number of adjustments and tweaks that make the application even more fun to use. Enjoy the new home dashboard design!

Under the hood, the new theme architecture enables us to bring more sophisticated themes control in the future.

### Download logs

When you inspect a panel, you can now download log results as a text (.txt) file.

[Download log results]({{< relref "../panels/inspect-panel.md#download-log-results" >}}) in [Inspect a panel]({{< relref "../panels/inspect-panel.md" >}}) was added as a result of this feature.

### Inspector in Explore

The new Explore inspector helps you understand and troubleshoot your queries. You can inspect the raw data, export that data to a comma-separated values (CSV) file, export log results in text format, and view query requests.

[Inspector in Explore]({{< relref "../explore/explore-inspector.md" >}}) was added as a result of this feature.

### Explore log improvements

Log navigation in Explore has been significantly improved. We added pagination to logs, so you can click through older or newer logs as needed.

[Logs in Explore]({{< relref "../explore/logs-integration.md" >}}) was updated as a result of these changes.

![Navigate logs in Explore](/img/docs/explore/navigate-logs-8-0.png)

### Tracing improvements

- Exemplars
- Better Jaeger search in Explore
- Show trace graph for Jaeger, Zipkin, and Tempo

### Plugin catalog

You can now use the Plugin catalog app to easily manage your plugins from within Grafana. Install, update, and uninstall plugins without requiring a server restart.

### Performance improvements

Grafana 8.0 includes many performance enhancements.

#### Initial startup and load performance

We reduced the Grafana initial download size massively, approximately 40%. This means that on slower or mobile connections, the initial login page or home dashboard will load much faster. 

All panels that have migrated from Flot to uPlot will also render two to three times faster because the library is much more efficient. Right now, this includes the Time series, Stat, Timeline, Histogram, and Barchart panel visualizations.

#### Operational and runtime performance

These improvements affect any subsequent data updates or interactions, including:

- Streaming performance
- General speed of interaction, such as zooming, tooltips, synchronized cursors, and panel updates while editing

### Data source updates

The following data source updates are included with this Grafana release.

#### Elasticsearch data source

[Elasticsearch data source]({{< relref "../datasources/elasticsearch.md" >}}) and [Provisioning]({{< relref "../administration/provisioning.md" >}}) were updated as a result of these changes.

##### Use semver strings to identify Elasticsearch version

We changed how the configured Elasticsearch version is handled. You can now specify via provisioning the full semver string version of your instance (such as “7.12.1”) instead of the old version format based on numbers. There’s no manual intervention needed, the old options will be correctly recognized.

##### Generic support for template variables

You can now use a different interpolation method to use template variables in a more extensive way. You can now use template variables in every query editor field that allows free input.

![Elasticsearch template variables](/img/docs/elasticsearch/input-templates-8-0.png)

##### Allow omitting field for metrics that support inline scripts

Metric aggregations can be specified without a field if a script is provided. You can now deselect fields for metrics aggregation when they support scripting.

Previously this was only possible when adding a new metric without selecting a field, because once selected, the field could not have been removed.

![Elasticsearch omit fields](/img/docs/elasticsearch/omit-fields-8-0.png)

##### Allow setting a custom limit for log queries

You can now set a custom line limit for logs queries instead of accepting the previously hard-coded 500. We also simplified the query editor to only show relevant fields when issuing logs queries.

![Elasticsearch custom log limit](/img/docs/elasticsearch/custom-log-limit-8-0.png)

##### Guess field type from first non-empty value

Response values were always interpreted as strings in Elasticsearch responses, which caused issues with some visualization types that applied logic based on numeric values. We now apply some heuristics to detect value types from the first non-empty value in each response.

#### Graphite data source

[Graphite data source]({{< relref "../datasources/graphite.md" >}}) was updated as a result of these changes.

##### Variable metric names expand

Values for dashboard variables can be now populated using the [Graphite expand API](https://graphite-api.readthedocs.io/en/latest/api.html#metrics-expand). Expand API is used when the metric query is wrapped in expand() function.

This way, values can contain not only the last matching node from the metric query, but also the full path of the metric. It can also be narrowed down to a specific node with a regular expression.

##### Map Graphite queries to Loki

Graphite queries are now automatically transformed to Loki queries according to user-defined rules when the data source changes in Explore.

#### Jaeger data source

You can now use more parameters to find traces.

[Jaeger data source]({{< relref "../datasources/jaeger.md" >}}) was updated as a result of this change.

### Authentication updates

This Grafana release includes the following authentication updates.

#### JWT

JWT is a new authentication option in Grafana.

#### Added JWT authentication support

You can now configure Grafana to accept a JWT token provided in the HTTP header.

[JWT authentication]({{< relref "../auth/jwt.md" >}}) was added and [Configuration]({{< relref "../administration/configuration.md#auth.jwt" >}}) was updated as a result of this feature.

#### OAuth

[Generic OAuth authentication]({{< relref "../auth/generic-oauth.md" >}}) has been updated as a result of these changes.

##### Added OAuth support for empty scopes

You can now configure generic OAuth with empty scopes. This allows OAuth Identity Providers that don't use or support scopes to work with Grafana authentication.

##### Added OAuth support for strict parsing of role_attribute_path

You can now configure generic OAuth with strict parsing of the `role_attribute_path`. By default, if  th `role_attribute_path` property does not return a role, then the user is assigned the `Viewer` role. You can disable the role assignment by setting `role_attribute_strict = true`. It denies user access if no role or an invalid role is returned.

## Enterprise features

These features are included in the Grafana Enterprise edition.

### Fine-grained access control

You can now add or remove detailed permissions from Viewer, Editor, and Admin org roles, to grant users just the right amount of access within Grafana. Available permissions include the ability to view and manage Users, Reports, and the Access Control API itself. Grafana will support more and more permissions over the coming months.

### Data source query caching

Grafana will now cache the results of backend data source queries, so that multiple users viewing the same dashboard or panel will not each submit the same query to the data source (like Splunk or Snowflake) itself. This results in faster average load times for dashboards and fewer duplicate queries overall to data sources, which reduces cost and the risk of throttling, reaching API limits, or overloading your data sources. Caching can be enabled per-data source, and time-to-live (TTL) can be configured globally and per data source. Query caching can be set up with Redis, Memcached, or a simple in-memory cache.

### Reporting updates

When creating a report, you can now choose to export Table Panels as .csv files attached to your report email. This will make it easier for recipients to view and work with that data. You can also link back to the dashboard directly from the email, for users who want to see the data live in Grafana. This release also includes some improvements to the Reports list view.

## Breaking changes

The following breaking changes are included in this release.

### Variables

- Removed the **Value groups/tags** feature from variables. Any tags will be removed.
- Removed the `never` refresh option for query variables. Existing variables will be migrated and any stored options will be removed.

Documentation was updated to reflect these changes.

### Elasticsearch: Use application/x-ndjson content type for multi-search requests

For multi-search requests, we now use the correct application/x-ndjson content type instead of the incorrect application/json. Although this should be transparent to most of the users, if you are running Elasticsearch behind a proxy, then be sure that your proxy correctly handles requests with this content type.
