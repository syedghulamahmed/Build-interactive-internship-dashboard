import { Link, useParams } from "react-router-dom";
import { ApplyForm } from "../components/ApplyForm";
import { Badge } from "../components/Badge";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { useInternships } from "../hooks/useInternships";

export function InternshipDetails() {
  const { id } = useParams<{ id: string }>();
  const { internships, loading, error, reload } = useInternships();

  if (loading) {
    return (
      <div className="app-shell">
        <main className="details-page"><LoadingState /></main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-shell">
        <main className="details-page">
          <ErrorState message={error} onRetry={reload} />
        </main>
      </div>
    );
  }

  const internship = internships.find((item) => item.id === id);

  if (!internship) {
    return (
      <div className="app-shell">
        <main className="details-page">
          <div className="state-card">
            <div className="state-icon" aria-hidden="true">?</div>
            <h2>Internship not found</h2>
            <p>The requested posting does not exist in the mock dataset.</p>
            <Link className="button primary" to="/">
              Back to internships
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/">
          <span className="brand-mark">IH</span>
          <span>Internship Hub</span>
        </Link>
        <Link className="back-link" to="/">← All internships</Link>
      </header>

      <main className="details-page">
        <Link className="back-link" to="/">← Back to opportunities</Link>

        <section className="details-hero">
          <div>
            <span className="eyebrow">{internship.category} · {internship.type}</span>
            <h1>{internship.title}</h1>
            <p className="details-company">{internship.company}</p>
          </div>
          <div className="details-meta">
            <div><span>Location</span><strong>{internship.location}</strong></div>
            <div><span>Duration</span><strong>{internship.duration}</strong></div>
            <div><span>Stipend</span><strong>{internship.stipend}</strong></div>
          </div>
        </section>

        <div className="details-layout">
          <article className="posting">
            <section>
              <h2>About the role</h2>
              <p>{internship.description}</p>
            </section>

            <section>
              <h2>Responsibilities</h2>
              <ul>
                {internship.responsibilities.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>

            <section>
              <h2>Requirements</h2>
              <ul>
                {internship.requirements.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>

            <section>
              <h2>Skills & tools</h2>
              <div className="badge-row">
                {internship.tags.map((tag) => <Badge key={tag} label={tag} />)}
              </div>
            </section>
          </article>

          <aside>
            <ApplyForm internshipTitle={internship.title} />
          </aside>
        </div>
      </main>
    </div>
  );
}
