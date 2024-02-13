import { Box, Tooltip, Typography } from "@mui/material"
import { useAppSelector } from "../../hooks"

interface DeadlinesProps {
  time: number
  rowIndex: number
  lastIndex: number
}

export function Deadlines({ time, rowIndex, lastIndex }: DeadlinesProps) {
  const deadlines = useAppSelector((state) => state.deadlines.deadlines)
  return (
    <>
      {Object.values(deadlines).map((deadline, idx) => {
        const deadlineTime = deadline.timestamp
        if (deadlineTime === time) {
          return (
            <Box width="fit-content">
              <Box
                key={idx}
                sx={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  width: "2px",
                  bgcolor: "red",
                  transform: "translate(-50%,0%)",
                  zIndex: 999,
                }}
              />
              {rowIndex === 0 ? (
                <Box
                  sx={{
                    position: "absolute",
                    top: -1,
                    left: -7,
                    width: "0px",
                    height: "0px",
                    borderStyle: "solid",
                    borderWidth: "0 7px 10px 7px",
                    borderColor: "transparent transparent red transparent",
                    transform: "rotate(180deg)",
                    zIndex: 999,
                  }}
                />
              ) : null}
              {rowIndex === lastIndex ? (
                <>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: -1,
                      left: -7,
                      width: "0px",
                      height: "0px",
                      borderStyle: "solid",
                      borderWidth: "0 7px 10px 7px",
                      borderColor: "transparent transparent red transparent",
                    }}
                  />
                  <Typography
                    sx={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      transform: "translate(-50%,0%)",
                      textAlign: "center",
                    }}
                    variant="body2"
                  >
                    {deadline.title}
                  </Typography>
                </>
              ) : null}
            </Box>
          )
        }
      })}
    </>
  )
}
