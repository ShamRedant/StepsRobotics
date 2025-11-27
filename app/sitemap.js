export default async function sitemap() {
  const routes = [
    "",
    "/programs",
    "/courses",
    "/about",
    "/contact",
  ].map((route) => ({
    url: `https://stepsrobotics.com${route}`,
    lastModified: new Date().toISOString(),
  }));

  return routes;
}

