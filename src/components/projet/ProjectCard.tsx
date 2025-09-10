"use client";

import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/projet-type";
import { useTranslation } from "@/lib/hooks/useTranslation";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col-reverse md:flex-row  md:items-start justify-between overflow-hidden bg-transparent ">
      <div className="md:w-1/2 w-full relative h-[300px] md:h-[400px] overflow-hidden group -z-30 rounded-l-lg shadow-lg ">
        <Image
          src={project.image}
          alt={`${t(project.nameKey)} screenshot`}
          width={800}
          height={1200}
          className="rounded-t-lg md:rounded-l-lg md:rounded-tr-none
               object-cover object-left-top
               w-full h-full
               transition-transform duration-500 ease-in-out
               group-hover:scale-[1.15] group-hover:origin-[0%_0%]
               transform-gpu"
        />
      </div>
      <div className="md:w-1/3   flex flex-col justify-between md:h-full">
        <div className="space-y-6 flex flex-col ">
          <h3 className="text-3xl md:text-4xl font-bold text-[#436896] hover:text-[#5182be] font-poppins">
            {t(project.nameKey)} {/* Traduction */}
          </h3>
          <div className="flex items-center justify-start gap-8">
            {project.links?.map((link: any, index: any) => (
              <Link
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-start items-center gap-2 hover:text-[#5182be] transition-colors"
              >
                {link.icon}
                <span className="">{t(link.labelKey)}</span> {/* Traduction */}
              </Link>
            ))}
          </div>

          <p className="text-xl font-poppins leading-relaxed">
            {t(project.descriptionKey)} {/* Traduction */}
          </p>
        </div>

        <div className="flex flex-wrap gap-8 py-8">
          {project.stats.map((stat, index) => (
            <div key={index} className="flex flex-col min-w-[120px]">
              <span className="text-sm uppercase tracking-wider text-[#436896] font-bold">
                {t(stat.labelKey)} {/* Traduction */}
              </span>
              <span className="text-2xl md:text-4xl font-semibold">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
