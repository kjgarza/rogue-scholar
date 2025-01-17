import {
  Alert,
  Box,
  Button,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import { Icon } from "@iconify/react"
import { useTranslation } from "next-i18next"

import { useUserName } from "@/lib/blog/auth"
import {
  useSubscriptionActions,
  useUserSubscriptions,
} from "@/lib/blog/subscriptions"

export default function UserSubscriptionAlert() {
  const { t } = useTranslation("common")
  const highlightColor = useColorModeValue("primary.500", "primary.400")
  const userName = useUserName()
  const { manageSubscription, loading } = useSubscriptionActions()
  const { currentlySubscribedPlan } = useUserSubscriptions()

  return (
    <Alert colorScheme="primary" variant="left-accent" p={8} rounded="md">
      <Stack direction={{ base: "column", md: "row" }} gap={5}>
        <Box color={highlightColor} fontSize="7xl">
          <Icon icon="fa6-solid:star" />
        </Box>
        <VStack align="start" spacing={3}>
          <Heading as="h3" fontSize="xl">
            {t("subscriptionAlert.title")}
          </Heading>
          <Text fontSize="lg">
            {t("subscriptionAlert.text", {
              userName,
              planName: currentlySubscribedPlan?.name,
            })}
          </Text>
          <Button
            colorScheme="primary"
            onClick={() => manageSubscription()}
            isLoading={loading}
          >
            {t("subscriptionAlert.manage")} &rarr;
          </Button>
        </VStack>
      </Stack>
    </Alert>
  )
}
