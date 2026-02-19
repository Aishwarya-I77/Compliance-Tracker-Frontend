import { DashboardStat } from "@/features/auth/dashboard/types";
import {
  Card,
  CardTop,
  CardTitle,
  CardIconWrap,
  CardValue,
  CardSub,
} from "@/features/auth/dashboard/components/StatCard.styles";

interface StatCardProps {
  stat: DashboardStat;
}

export default function StatCard({ stat }: StatCardProps) {
  return (
    <Card $borderColor={stat.borderColor}>
      <CardTop>
        <CardTitle>{stat.title}</CardTitle>
        <CardIconWrap $bg={stat.iconBg} $color={stat.iconColor}>
          {stat.icon}
        </CardIconWrap>
      </CardTop>
      <CardValue>{stat.value}</CardValue>
      <CardSub $color={stat.subColor}>{stat.sub}</CardSub>
    </Card>
  );
}
