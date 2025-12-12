const AboutPage = () => {
  return (
    <div className='max-w-5xl mx-auto px-6 py-16 bg-gray-900'>
      {/* Intro */}
      <div className='flex flex-col md:flex-row md:items-start items-center gap-10 mb-12'>
        <img
          src='https://github.com/analeao-dev.png'
          alt='profile'
          className='w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-md'
        />
        <div>
          <h1 className='text-3xl font-bold text-white mb-2'>
            Oi, eu sou a Ana 👋
          </h1>
          <p className='text-gray-300 text-lg'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat vitae magni officiis dicta maiores quam suscipit explicabo quis doloribus ab nam nihil in, at ratione odit consequuntur impedit sit rerum.
          </p>
        </div>
      </div>

      {/* Bio Section */}
      <div className='mb-12'>
        <h2 className='text-2xl font-semibold text-white mb-4'>Minha Missão</h2>
        <p className='text-gray-300 leading-relaxed'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem similique optio vero aliquid accusamus eaque distinctio non, repellat sed odit pariatur, nesciunt ex minus recusandae possimus molestiae. Corrupti, deleniti architecto.
        </p>
      </div>

      {/* Tech Stack */}
      <h2 className='text-2xl font-semibold text-white mb-4'>🚀 Tecnologias</h2>
      <ul className='flex flex-wrap gap-4 text-sm text-gray-300'>
        {[
          'React',
          'Next.js',
          'Tailwind CSS',
          'Node.js',
          '.NET',
          'Prisma',
          'MongoDB',
          'PostgreSQL',
          'Docker',
        ].map((tech) => (
          <li key={tech} className='bg-gray-700 px-3 py-1 rounded-md'>
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AboutPage;
