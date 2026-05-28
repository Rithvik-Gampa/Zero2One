import { motion } from "framer-motion";
function HowItWorks() {

  const steps = [

  {
    number:"01",

    title:"Smart Dashboard",

    description:
      "Access all your AI learning tools, streaks, and study progress in one place."
  },

  {
    number:"02",

    title:"AI Learn",

    description:
      "Understand concepts through beginner mode, exam-ready explanations, and real-life analogies."
  },

  {
    number:"03",

    title:"Notes Quiz",

    description:
      "Generate interactive quizzes instantly and test your understanding smarter."
  },

  {
    number:"04",

    title:"Study Planner",

    description:
      "Create personalized AI-powered study schedules based on your learning goals."
  }
];

  return (

    <section

  id="how-it-works"

  className="how-section"
>

      <div className="section-header">

        <h2>
          Explore The Platform
        </h2>

        <p>
          Powerful AI tools designed to help students learn smarter and faster.
        </p>

      </div>

      <div className="timeline">

        {steps.map((step, index) => (

          <motion.div

  key={index}

  className="timeline-card"

  initial={{ opacity: 0, x: -80 }}

  whileInView={{ opacity: 1, x: 0 }}

  transition={{
    duration: 0.7,
    delay: index * 0.15
  }}

  viewport={{ once: true }}
>

            <div className="timeline-number">
              {step.number}
            </div>

            <div className="timeline-content">

              <h3>
                {step.title}
              </h3>
            <p>
  {step.description}
</p>
              <p>
                {step.text}
              </p>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
}

export default HowItWorks;