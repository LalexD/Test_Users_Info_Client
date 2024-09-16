import clsx from 'clsx';
import styles from './Heading.module.scss';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    headingLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    className?: string;
}

export const Heading: React.FC<HeadingProps> = ({
    headingLevel = 'h1',
    className,
    children
}) => {
    const Heading = headingLevel;
    return <Heading className={clsx(styles[`heading-${headingLevel}`], className)}>{children}</Heading>
}
