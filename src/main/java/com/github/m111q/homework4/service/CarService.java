package com.github.m111q.homework4.service;

import com.github.m111q.homework4.model.Car;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CarService {

    private List<Car> carList;
    private Logger logger = LoggerFactory.getLogger(CarService.class);

    public CarService() {
        this.carList = new ArrayList<>();
        setUpList();
        logger.info("Start CarService");
    }

    public Optional<Car> getCarById(long id) {
        logger.info("getCarById() " + id);

        return carList.stream()
                .filter(e -> e.getId() == id)
                .findFirst();

    }

    public List<Car> getAllCars() {
        logger.info("getAllCars()");
        return carList;
    }

    public List<Car> getCarsByColor(String color) {
        logger.info("getCarsByColor(String color) " + color);
        return carList.stream()
                .filter(e -> e.getColor().toLowerCase().equals(color.toLowerCase()))
                .collect(Collectors.toList());
    }

    public boolean addCar(Car car) {
        logger.info("addCar(Car car) " + car);
        return carList.add(car);
    }

    public boolean modCar(Car car) {
        Optional<Car> first = getCarById(car.getId());
        logger.info("modCar(Car car) " + car);
        if (first.isPresent()) {
            Car carTomod = first.get();
            carTomod.setColor(car.getColor());
            carTomod.setMark(car.getMark());
            carTomod.setModel(car.getModel());
            logger.info("modCar(Car car) = " + true);
            return true;
        }
        logger.info("modCar(Car car) = " + false);
        return false;
    }

    public boolean removeCarFromList(long id) {
        logger.info("removeCarFromList(long id) " + id);
        return carList.removeIf(x -> x.getId() == id);
    }

    public boolean updateCarByOneField(Car car) {
        Optional<Car> first = getCarById(car.getId());
        boolean result = false;
        if (first.isPresent()) {
            Car carToMod = first.get();
            if (car.getColor() != null && !car.getColor().equals("") && !carToMod.getColor().equals(car.getColor())) {
                carToMod.setColor(car.getColor());
                System.out.println("mod color");
                result = true;
            }
            if (car.getModel() != null && !car.getModel().equals("") && !carToMod.getModel().equals(car.getModel())) {
                carToMod.setModel(car.getModel());
                System.out.println("mod model");
                result = true;
            }
            if (car.getMark() != null && !car.getMark().equals("") && !carToMod.getMark().equals(car.getMark())) {
                carToMod.setMark(car.getMark());
                System.out.println("mod mark");
                result = true;
            }
        }
        logger.info("updateCarByOneField(Car car) " + car + System.lineSeparator() + "result = " + result);
        return result;
    }

    private void setUpList() {
        carList.add(new Car(1L, "BMW", "abcx", "red"));
        carList.add(new Car(2L, "Ursus", "zzz", "yellow"));
        carList.add(new Car(3L, "Polonez", "czxc", "black"));
        carList.add(new Car(4L, "MINI", "aaa", "black"));
    }


}
