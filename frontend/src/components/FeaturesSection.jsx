import { motion } from "framer-motion";
function FeaturesSection() {

  const features = [

  {
    icon:"🏠",

    title:"Smart Dashboard",

    description:
      "Track learning progress, streaks, and access all AI tools from one place."
  },

  {
    icon:"🧠",

    title:"AI Learn",

    description:
      "Understand any concept with beginner mode, exam-ready answers, and real-life analogies."
  },

  {
    icon:"📝",

    title:"Notes Quiz",

    description:
      "Generate interactive quizzes instantly and test your understanding smarter."
  },

  {
    icon:"📅",

    title:"Study Planner",

    description:
      "Create personalized AI-powered study schedules based on your goals."
  },

  {
    icon:"🔥",

    title:"Daily Streaks",

    description:
      "Build consistent learning habits and stay motivated every day."
  },

  {
    icon:"🎯",

    title:"Personalized Learning",

    description:
      "Experience customized learning tailored to your pace and understanding."
  }
];

  return (

    <section

  id="features"

  className="features-section"
>

      <div className="section-header">

        <h2>
          Powerful AI Learning Features
        </h2>

        <p>
          Everything you need to learn smarter,
          faster, and more effectively.
        </p>

      </div>

      <div className="features-grid">

        {features.map((feature, index) => (

          <motion.div

  key={index}

  className="feature-card"

  initial={{ opacity: 0, y: 50 }}

  whileInView={{ opacity: 1, y: 0 }}

  transition={{
    duration: 0.6,
    delay: index * 0.1
  }}

  viewport={{ once: true }}
>

            <div className="feature-icon">
              {feature.icon}
            </div>

            <h3>
              {feature.title}
            </h3>
          <p>
  {feature.description}
</p>
            <p>
              {feature.text}
            </p>

          </motion.div>

        ))}

      </div>

    </section>
  );
}

export default FeaturesSection;