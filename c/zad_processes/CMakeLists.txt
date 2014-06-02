PROJECT(zad_processes)

ADD_EXECUTABLE(zad_processes process.cpp coordinator.cpp main.cpp)

target_link_libraries( 
  zad_processes
  pthread
)
