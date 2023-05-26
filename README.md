<img src="./assets/banner.svg" alt="Next SEOmatic" width="100%" />

# Next SEOmatic

Next SEOmatic is a library designed to integrate SEOmatic data into Next.js applications using the App Router. With this package, handling SEO data becomes a breeze, letting you focus on building your app.

> **Note**
> 
> If your Next.js project uses the Pages Router, consider using the [`react-seomatic`](https://github.com/joshuabaker/react-seomatic) package instead. Choose the package that suits your routing strategy for a seamless SEOmatic integration.

- [Installation](#installation)
- [Getting the Data](#getting-the-data)
- [Using the `getMetadata` Function](#using-the-getmetadata-function)
- [Using the `SeoMatic` Component](#using-the-seomatic-component)
- [Using the `JsonLd` Component](#using-the-jsonld-component)
- [Using the `Scripts` Component](#using-the-scripts-component)


## Installation

To install the package using `npm`, run the following command in your terminal:

```bash
npm install next-seomatic
```

Alternatively, if you are using `yarn`, use the following command:

```bash
yarn add next-seomatic
```


## Getting the Data

Next SEOmatic is designed to work in tandem with the SEOmatic plugin for Craft CMS, which provides a GraphQL integration that fetches SEO data for entries.

To ensure Next SEOmatic functions correctly, the `asArray` parameter in your GraphQL query should be set to true. This allows the data to be formatted as objects, as illustrated in the following query:

```gql
{
  query QueryEntry {
    entry(uri: $uri) {
      seomatic(asArray: true) {
        metaJsonLdContainer
        metaLinkContainer
        metaScriptContainer
        metaSiteVarsContainer
        metaTagContainer
        metaTitleContainer
      }
    }
  }
}
```

For a more detailed guide on using this in conjunction with the Craft CMS GraphQL API, refer to the [Headless SPA API documentation](https://nystudio107.com/docs/seomatic/advanced.html#headless-spa-api).


## Using the `getMetadata` Function

The `getMetadata` function in Next SEOmatic is designed to work in conjunction with the [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata). It aims to convert the data provided by SEOmatic into a format that can be easily utilized by this API.

The `getMetadata` function accepts three arguments: `metaLinkContainer`, `metaTagContainer` and `metaTitleContainer`.

These arguments correspond to the containers provided by SEOmatic. If you need information on how to retrieve data for these containers, please refer to the usage section above.

Here’s a simplified example demonstrating the use of `getMetadata`:

```jsx
import { getMetadata } from "next-seomatic";

export async function generateMetadata() {
  const { entry } = fetchGraphQl('your/uri');

  return getMetadata(entry.seomatic);
}
```

In this example, `getMetadata` takes `entry.seomatic` (which includes the container values) as an argument and returns metadata ready for consumption by the Next.js Metadata API.

> **Note**
> 
> Some site verification values stored in SEOmatic are not supported by the Metadata API (e.g. Bing). If you need these, please pass them as [custom metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#other) manually.


## Using the `SeoMatic` Component

The `SeoMatic` component combines the `JsonLd` and `Scripts` components (see below) into a single component. This allows you to include both the JSON-LD scripts and the SEO scripts in one place.

Here's how you can use the `SeoMatic` component:

```jsx
import { SeoMatic } from "next-seomatic";

export async default function Page() {
  const { entry } = fetchGraphQl('your/uri');

  return (
    <>
      {/* Your page components */}
      <SeoMatic
        metaJsonLdContainer={entry.seomatic.metaJsonLdContainer}
        metaScriptContainer={entry.seomatic.metaScriptContainer}
      />
    </>
  );
}
```

In this example, the `SeoMatic` component wraps both `JsonLd` and `Scripts` components, passing through the appropriate props to each. 

Just like the `JsonLd` and `Scripts` components, it expects the `metaJsonLdContainer` and `metaScriptContainer` as props. These props should contain the respective SEO data retrieved from your SEOmatic GraphQL query. 

This provides a convenient way to inject SEO data into your Next.js pages, handling both the structured data and SEO scripts at once. It’s recommended that you use this component unless you have a specific need otherwise.


## Using the `JsonLd` Component

The `JsonLd` component serves to parse SEOmatic’s `metaJsonLdContainer` and renders it into a JSON-LD script for use in your Next.js application.

Here is a simplified example demonstrating the use of `JsonLd`:

```jsx
import { JsonLd } from "next-seomatic";

export async default function Page() {
  const { entry } = await fetchGraphQl('your/uri');
  
  return (
    <>
      {/* Your page components */}
      <JsonLd metaJsonLdContainer={entry.seomatic.metaJsonLdContainer} />
    </>
  );
}

```

In this example, the `JsonLd` component takes `metaJsonLdContainer` (retrieved from the SEOmatic's data via GraphQL) as a prop and returns a `<script>` tag containing the parsed JSON-LD data. If the `metaJsonLdContainer` is not present or can't be parsed, the component returns `null` and nothing will be rendered.

Sure, here's a `Usage` section specifically for the `Scripts` component:


## Using the `Scripts` Component

The `Scripts` component parses SEOmatic’s `metaScriptContainer` and renders scripts (e.g. tracking).

Here's an example of how to use it:

```jsx
import { Scripts } from "next-seomatic";

export async default function Page() {
  const { entry } = await fetchGraphQl('your/uri');
  
  return (
    <>
      {/* Your page components */}
      <Scripts metaScriptContainer={entry.seomatic.metaScriptContainer} />
    </>
  );
}
```

> **Note**
> 
> The `Scripts` component is designed to output the SEOmatic scripts inside a hidden `<div>` element. This div is positioned off-screen and has a size of 1x1 pixel, ensuring that it does not interfere with your page layout or design.
> 
> Be aware, the `Scripts` component places scripts exactly where it is positioned in your JSX, ignoring the location specified in the SEOmatic data.
