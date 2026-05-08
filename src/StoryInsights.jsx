export default function StoryInsights({ totalArticles }) {
  return (
    <section className="insights" aria-label="Story insights">
      <h2>Performance notes</h2>
      <p>
        The optimized branch keeps rendering work small while still handling {totalArticles} stories.
      </p>
      <ul className="insights-list">
        <li>Top stories load in parallel.</li>
        <li>Only visible rows stay mounted in the DOM.</li>
        <li>Filtering stays responsive with deferred input updates.</li>
      </ul>
    </section>
  );
}
