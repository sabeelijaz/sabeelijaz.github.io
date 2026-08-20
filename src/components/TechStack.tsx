import { useFadeUp } from '../hooks/useFadeUp'
import loopbackIcon from '../assets/images/loopback-colored.svg'
import typeormIcon from '../assets/images/typeorm-icon-colored.png'

const CATEGORIES = [
  {
    label: 'Languages',
    items: [
      { cls: 'devicon-java-plain colored', name: 'Java' },
      { cls: 'devicon-typescript-plain colored', name: 'TypeScript' },
      { cls: 'devicon-javascript-plain colored', name: 'JavaScript' },
      { cls: 'devicon-nodejs-plain colored', name: 'Node.js' },
    ],
  },
  {
    label: 'Frameworks & Libraries',
    items: [
      { cls: 'devicon-angular-plain colored', name: 'Angular' },
      { cls: 'devicon-react-original colored', name: 'React' },
      { cls: 'devicon-spring-plain colored', name: 'Spring Boot' },
      { img: loopbackIcon, name: 'LoopBack' },
      { cls: 'devicon-nestjs-plain colored', name: 'NestJS' },
      { cls: 'devicon-nextjs-plain colored', name: 'Next.js' },
      { cls: 'devicon-redux-original colored', name: 'Redux / RxJS' },
    ],
  },
  {
    label: 'Databases',
    items: [
      { cls: 'devicon-mysql-plain colored', name: 'MySQL' },
      { cls: 'devicon-postgresql-plain colored', name: 'PostgreSQL' },
      { cls: 'devicon-mongodb-plain colored', name: 'MongoDB' },
      { cls: 'devicon-redis-plain colored', name: 'Redis' },
    ],
  },
  {
    label: 'ORM / Query Builders',
    items: [
      { cls: 'devicon-sequelize-plain colored', name: 'Sequelize' },
      { cls: 'devicon-hibernate-plain colored', name: 'Hibernate' },
      { img: typeormIcon, name: 'TypeORM' },
      { cls: 'devicon-knexjs-original colored', name: 'Knex / Objection' },
    ],
  },
  {
    label: 'Cloud & DevOps',
    items: [
      { cls: 'devicon-amazonwebservices-plain colored', name: 'AWS' },
      { cls: 'devicon-amazonwebservices-plain colored', name: 'EC2 · S3 · SQS' },
      { cls: 'devicon-rabbitmq-original colored', name: 'RabbitMQ' },
      { cls: 'devicon-nodejs-plain colored', name: 'BullMQ' },
      { cls: 'devicon-git-plain colored', name: 'Git' },
      { cls: 'devicon-jira-plain colored', name: 'Jira' },
    ],
  },
  {
    label: 'Frontend',
    items: [
      { cls: 'devicon-html5-plain colored', name: 'HTML5' },
      { cls: 'devicon-css3-plain colored', name: 'CSS3' },
      { cls: 'devicon-sass-original colored', name: 'SASS' },
    ],
  },
]

export default function TechStack() {
  const ref = useFadeUp()

  return (
    <section className="section fade-up" id="tech-stack" ref={ref as React.RefObject<HTMLElement>}>
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">Skills</span>
          <h2 className="section-title">Tech Stack</h2>
          <p className="section-subtitle">
            Delivering reliable and scalable software through a carefully selected set of modern technologies.
          </p>
        </div>
        {CATEGORIES.map((cat) => (
          <div className="tech-category" key={cat.label}>
            <div className="tech-category-label">{cat.label}</div>
            <div className="tech-grid">
              {cat.items.map((item) => (
                <div className="tech-item" key={item.name}>
                  {'img' in item ? (
                    <img src={item.img} alt={item.name} className="tech-icon" />
                  ) : (
                    <i className={item.cls} />
                  )}
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
